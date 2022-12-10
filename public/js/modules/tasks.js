const Tasks = {
    rewards: [
        ['Кристаллы', 'assets/img/kry_big.webp'],
        ['Золотой ящик', 'assets/img/g-gold.webp']
    ],
    render(tasksArray) {
        const tasks = Object.entries(tasksArray);
        let tasksHtml = '';

        for (const [i, task] of tasks) {
            let btn = '', itemClass = '', blocked = '';
            if (task.current >= task.need) {
                itemClass = ' done';
                btn = `<button class="quest-change success" onclick="Tasks.getReward(${i})">Забрать приз</button><i class="done"></i>`;
            } else {
                btn = `
                <button class="quest-change" onclick="alertify_quest('Вы действительно хотите сменить это задание за 999 <kry></kry> ?', 'Tasks.change(${i})')">
                    Сменить <span class="num">999</span> <kry></kry>
                </button>
                `;
            }

            let d = (new Date(task.timer)).getTime();
            if (d > Date.now()) {
                // TODO: отображение блокировки
                itemClass = ' blocked';
                blocked = `data-blocked="${remaining(d, 1)}"`;
            }

            tasksHtml += `
            <div class="quests__item${itemClass}"${blocked}>
                <div class="quests__item-pretitle">Задание</div>
                <img src="${task.img}" alt="">
                <div class="title">
                    <div class="quest-name">${task.name}</div>
                    <div class="progress-title">${Math.min(task.current, task.need)} / ${task.need}</div>
                </div>
                <div class="progress">
                    <div style="width: ${Math.min((task.current * 100) / task.need, 100)}%"></div>
                </div>
                <div class="prize">
                    <div class="prize__title">Приз</div>
                    <div class="prize__img">
                        <div class="prize__img-title">
                            <div>${this.rewards[task.reward[0]][0]}</div>
                            <div class="prize-amount">x${task.reward[1]}</div>
                        </div>
                        <img src="${this.rewards[task.reward[0]][1]}" alt="">
                    </div>
                </div>
                ${btn}
            </div>
            `;
        }
        $('.quests').html(tasksHtml);
    },
    change(id) {
        $.post('/api/tasks/change/' + id, res => {
            alertify_close();
            if (typeof res.error !== 'undefined') {
                alertify(res.error, 'Ошибка', 2);
            } else {
                socket.emit('getAccount');
                this.render(res.success);
            }
        });
    },
    getReward(id) {
        $.post('/api/tasks/getreward/' + id, res => {
            if (typeof res.error !== 'undefined') {
                alertify(res.error, 'Ошибка', 2);
            } else {
                socket.emit('getAccount');
                this.render(res.success);
                alertify('Награда получена!', 'Успех', 1);
            }
        });
    },
    start() {
        $.post('/api/tasks/start', res => {
            if (typeof res.error !== 'undefined') {
                alertify(res.error, 'Ошибка', 2);
            } else {
                $(".quests-start").remove();
                this.render(res.success);
                ME.hasTasks = true;
            }
        });
    },
    load() {
        $.get('/api/tasks/get', res => {
            if (typeof res.error !== 'undefined') {
                if(res.error !== 'Задания не найдены!') alertify(res.error, 'Ошибка', 2);
            } else {
                this.render(res.success);
            }
        });
    }
};
