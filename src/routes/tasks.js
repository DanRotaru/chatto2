const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const { Tasks, getTask } = require('../data/Tasks')

const { getUserInfo, userExists, sys } = require('../db/index')
const { rand, time, number_format, getNumEnding } = require('../helpers')
const getRank = require('../data/Ranks')

router.get("/api/tasks/get", async(req, res) => {
    let auth = await req.session.auth;
    login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    }

    let info = await getUserInfo(login, {tasks: 1});

    // user doesnt have tasks
    if(!info.tasks || !info.tasks.length){
        res.end(JSON.stringify({
            error: "Задания не найдены!"
        }));
        return;
    }

    let mytasks = [];
    for (let task of info.tasks){
        let taskInfo = getTask(task.taskId);

        mytasks.push({
            ...taskInfo,
            current: task.taskCurrent,
            timer: task.taskTimer
        });
    }

    for (let t of mytasks) {
        delete t.probability;
        delete t.id;
        delete t.type;
    }

    res.send(JSON.stringify({ success: mytasks }));
});

router.post("/api/tasks/start", async(req, res) => {
    let auth = await req.session.auth;
    login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    }

    let info = await getUserInfo(login, {tasks: 1});

    // user have tasks
    if(typeof info.tasks !== 'undefined' && info.tasks.length > 0){
        res.end(JSON.stringify({
            error: "Вы уже начали задания!"
        }));
        return;
    }

    info.tasks = [];

    let mytasks = [];
    let myTasksTypes = [];
    let newTaskType = 0;

    let availableTaskIds = [];
    for (let task of Tasks) {
        if (task.probability > 0) {
            availableTaskIds.push(task.id);
        }
    }

    do {
        let rnd = availableTaskIds[rand(0, availableTaskIds.length - 1)];
        let task = getTask(rnd);

        newTaskType = task.type;

        if (Math.random() < task.probability && !myTasksTypes.includes(newTaskType)) {
            myTasksTypes.push(task.type);

            info.tasks.push({
                taskId: task.id,
                taskCurrent: 0,
                taskTimer: new Date().toISOString(),
                taskType: task.type
            });
            mytasks.push({
                current: 0,
                timer: new Date().toISOString(),
                ...task,
            });
        }
    } while(myTasksTypes.length < 3);

    await info.save();

    for (let t of mytasks) {
        delete t.probability;
        delete t.id;
        delete t.type;
    }

    res.send(JSON.stringify({ success: mytasks }));
});

router.post('/api/tasks/change/:id', async(req, res) => {
    let auth = await req.session.auth;
    login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    } else if (req.params.id != 0 && req.params.id != 1 && req.params.id != 2) {
        resp(res, 400);
        return;
    }

    let info = await getUserInfo(login, {tasks: 1, kry: 1});

    // user doesnt have tasks
    if(!info.tasks || !info.tasks.length){
        res.end(JSON.stringify({
            error: "Задания не найдены!"
        }));
        return;
    }

    let task = info.tasks[req.params.id];
    let taskInfo = getTask(task.taskId);



    if ((new Date(task.taskTimer)).getTime() > Date.now()) {
        res.end(JSON.stringify({
            error: 'Вы не можете сменить задание пока оно не активно!'
        }));
        return;
    }
    if (task.taskCurrent >= taskInfo.need) {
        res.end(JSON.stringify({
            error: 'Вы не можете сменить выполненное задание!'
        }));
        return;
    }

    let usedTypes = [info.tasks[0].taskType, info.tasks[1].taskType, info.tasks[2].taskType];
    let newTaskProb = -1;

    let availableTaskIds = [];
    for (let task of Tasks) {
        if (task.probability > 0 && !usedTypes.includes(task.type)) {
            availableTaskIds.push(task.id);
        }
    }

    do {
        let rnd = availableTaskIds[rand(0, availableTaskIds.length - 1)];
        let newTask = getTask(rnd);

        newTaskProb = newTask.probability;

        info.tasks[req.params.id] = {
            taskId: newTask.id,
            taskCurrent: 0,
            taskTimer: new Date().toISOString(),
            taskType: newTask.type
        };
    } while(Math.random() < newTaskProb);

    info.kry -= 999;

    await info.save();

    let mytasks = [];
    for (let mytask of info.tasks) {
        mytasks.push({
            current: mytask.taskCurrent,
            timer: mytask.taskTimer,
            ...getTask(mytask.taskId)
        });
    }
    for (let t of mytasks) {
        delete t.probability;
        delete t.id;
        delete t.type;
    }

    res.send(JSON.stringify({ success: mytasks }));
});

const getReward = (io) => {
    router.post('/api/tasks/getreward/:id', async (req, res) => {
        let auth = await req.session.auth;
        login = await userExists(auth);
        if(!login){
            resp(res, 401);
            return;
        } else if (req.params.id != 0 && req.params.id != 1 && req.params.id != 2) {
            resp(res, 400);
            return;
        }

        let info = await getUserInfo(login, {tasks: 1, kry: 1, score: 1, vip: 1});
        // console.log(info.tasks);
        // user have doesnt have tasks
        if(!info.tasks || !info.tasks.length){
            res.end(JSON.stringify({
                error: "Задания не найдены!"
            }));
            return;
        }

        let task = info.tasks[req.params.id];
        let taskInfo = getTask(task.taskId);

        if (task.taskCurrent < taskInfo.need) {
            res.end(JSON.stringify({
                error: 'Задание ещё не выполнено!'
            }));
            return;
        }

        // награда
        const [rewardType, rewardVal] = taskInfo.reward;
        let rewardText = '';

        if (rewardType === 0) {// выдаём кристаллы
            info.kry += rewardVal;
            rewardText = number_format(rewardVal) + ' ' + getNumEnding(rewardVal, ['кристалл', 'кристалла', 'кристаллов']);
        } else if (rewardType === 1) {// выдаём золотые ящики
            const userGarage = await Garage.findOne({ login: login }, { golds: 1 });
            userGarage.golds = userGarage.golds || 0;
            userGarage.golds += rewardVal;
            await userGarage.save();

            rewardText = rewardVal + ' ' + getNumEnding(rewardVal, ['золотой ящик', 'золотых ящика', 'золотых ящиков']);
        }

        // генерируем новое задание, исключая дубликаты
        // при этом на место выполненного задания может стать точно такое же
        /*let usedTypes = [];
        for (let uTask of info.tasks) {
            if (uTask.taskId === task.taskId) continue;

            usedTypes.push(uTask.taskType);
        }
        let newTaskType = 0;

        do {
            let rnd = rand(1, Tasks.length);
            let newTask = getTask(rnd);

            newTaskType = newTask.type;

            info.tasks[req.params.id] = {
                taskId: newTask.id,
                taskCurrent: 0,
                taskTimer: new Date((time() + 18000) * 1000).toISOString(),
                taskType: newTask.type
            };
        } while(usedTypes.includes(newTaskType));*/
        // --------
        let usedTypes = [];
        for (let uTask of info.tasks) {
            if (uTask.taskId === task.taskId) continue;

            usedTypes.push(uTask.taskType);
        }
        let newTaskProb = -1;

        let availableTaskIds = [];
        for (let task of Tasks) {
            if (task.probability > 0 && !usedTypes.includes(task.type)) {
                availableTaskIds.push(task.id);
            }
        }

        do {
            let rnd = availableTaskIds[rand(0, availableTaskIds.length - 1)];
            let newTask = getTask(rnd);

            newTaskProb = newTask.probability;

            info.tasks[req.params.id] = {
                taskId: newTask.id,
                taskCurrent: 0,
                taskTimer: new Date((time() + 18000) * 1000).toISOString(),
                taskType: newTask.type
            };
        } while(Math.random() < newTaskProb);
        // --------

        await info.save();

        // Добавляем сообщение в чат
        let rank = getRank(info.score, info.vip);
        await sys(`{:cTask=${rank}=${login}=${taskInfo.name}=${rewardText}:}`, io);

        // отдаём обновлённый список заданий
        let mytasks = [];
        for (let mytask of info.tasks) {
            mytasks.push({
                current: mytask.taskCurrent,
                timer: mytask.taskTimer,
                ...getTask(mytask.taskId)
            });
        }
        for (let t of mytasks) {
            delete t.probability;
            delete t.id;
            delete t.type;
        }

        res.send(JSON.stringify({ success: mytasks }));
    });
}

module.exports = {
    router,
    getReward
};