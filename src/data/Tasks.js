// описание типов заданий
// 1 - написать сообщения
// 2 - накопить кристаллы
// 3 - поймать золотой ящик
// 4 - набрать опыт
// 5 - купить премиум
// 6 - купить золотой ящик
// 7 - отправить "значок"
// 8 - отправить "голдолов"
// 9 - отправить "синий шар"
// 10 - отправить "лайк"
// 11 - отправить "бро"
// 12 - открыть кейс "кри"
// 13 - открыть кейс за 5к
// 14 - открыть кейс за 10к
// 16 - открыть кейс за 20к
// 15 - открыть кейс "опыт"
// 17 - активировать карту
const Tasks = [
    {
        id: 1,
        type: 1,
        name: 'Написать 200 сообщений',
        img: '/img/tasks/chat-conversation.svg',
        need: 200,
        reward: [0, 8000],
        probability: 0.3
    },
    {
        id: 2,
        type: 1,
        name: 'Написать 300 сообщений',
        img: '/img/tasks/chat-conversation.svg',
        need: 300,
        reward: [0, 10000],
        probability: 0.4
    },
    {
        id: 3,
        type: 1,
        name: 'Написать 1000 сообщений',
        img: '/img/tasks/chat-conversation.svg',
        need: 1000,
        reward: [0, 15000],
        probability: 0.1
    },
    {
        id: 4,
        type: 2,
        name: 'Накопить 5000 кристаллов',
        img: '/assets/img/kry_big.webp',
        need: 5000,
        reward: [0, 3000],
        probability: 0.1
    },
    {
        id: 5,
        type: 2,
        name: 'Накопить 10000 кристаллов',
        img: '/assets/img/kry_big.webp',
        need: 10000,
        reward: [0, 8000],
        probability: 0.2
    },
    {
        id: 6,
        type: 2,
        name: 'Накопить 50000 кристаллов',
        img: '/assets/img/kry_big.webp',
        need: 50000,
        reward: [0, 25000],
        probability: 0.9
    },
    {
        id: 7,
        type: 2,
        name: 'Накопить 100000 кристаллов',
        img: '/assets/img/kry_big.webp',
        need: 100000,
        reward: [0, 40000],
        probability: 0.4
    },
    {
        id: 8,
        type: 3,
        name: 'Поймать 2 золотых ящика',
        img: '/assets/img/activeGoldBox.svg',
        need: 2,
        reward: [0, 2000],
        probability: 0.3
    },
    {
        id: 9,
        type: 3,
        name: 'Поймать 3 золотых ящика',
        img: '/assets/img/activeGoldBox.svg',
        need: 3,
        reward: [0, 2500],
        probability: 0.7
    },
    {
        id: 10,
        type: 3,
        name: 'Поймать 10 золотых ящиков',
        img: '/assets/img/activeGoldBox.svg',
        need: 10,
        reward: [1, 5],
        probability: 0.8
    },
    {
        id: 11,
        type: 4,
        name: 'Набрать 500 опыта',
        img: '/assets/img/score_big.webp',
        need: 500,
        reward: [0, 2000],
        probability: 0.7
    },
    {
        id: 12,
        type: 4,
        name: 'Набрать 2000 опыта',
        img: '/assets/img/score_big.webp',
        need: 2000,
        reward: [0, 5000],
        probability: 0.9
    },
    {
        id: 13,
        type: 4,
        name: 'Набрать 2555 опыта',
        img: '/assets/img/score_big.webp',
        need: 2555,
        reward: [0, 5555],
        probability: 0.8
    },
    {
        id: 14,
        type: 4,
        name: 'Набрать 5000 опыта',
        img: '/assets/img/score_big.webp',
        need: 5000,
        reward: [0, 10000],
        probability: 0.7
    },
    {
        id: 15,
        type: 4,
        name: 'Набрать 50000 опыта',
        img: '/assets/img/score_big.webp',
        need: 50000,
        reward: [0, 100000],
        probability: 0.3
    },
    {
        id: 16,
        type: 5,
        name: 'Купить премиум на 7 дней',
        img: '/img/shop/premium.webp',
        need: 1,
        reward: [0, 99999],
        probability: 0.4
    },
    {
        id: 17,
        type: 5,
        name: 'Купить премиум на 90 дней',
        img: '/img/shop/premium.webp',
        need: 1,
        reward: [0, 2000000],
        probability: 0.5
    },
    {
        id: 18,
        type: 6,
        name: 'Сбросить 2 золотых ящика',
        img: '/img/shop/mg-box2.webp',
        need: 2,
        reward: [0, 10000],
        probability: 0.6
    },
    {
        id: 19,
        type: 6,
        name: 'Сбросить 20 золотых ящиков',
        img: '/img/shop/mg-box3.webp',
        need: 20,
        reward: [0, 50000],
        probability: 0.7
    },
    {
        id: 20,
        type: 7,
        name: 'Отправить 10 значков',
        img: 'https://i.ibb.co/Cw8DKvP/image.png',
        need: 10,
        reward: [0, 8000],
        probability: 0.7
    },
    {
        id: 21,
        type: 7,
        name: 'Отправить 13 значков',
        img: 'https://i.ibb.co/Cw8DKvP/image.png',
        need: 10,
        reward: [0, 9000],
        probability: 0.4
    },
    {
        id: 22,
        type: 8,
        name: 'Отправить 10 подарков &laquo;Голдолов&raquo;',
        img: 'https://i.ibb.co/p1VFg3r/image.png',
        need: 10,
        reward: [0, 30000],
        probability: 0.5
    },
    {
        id: 23,
        type: 9,
        name: 'Отправить 2 подарка &laquo;Синий шар&raquo;',
        img: 'https://i.ibb.co/S0x6h3j/image.png',
        need: 2,
        reward: [0, 50000],
        probability: 0.9
    },
    {
        id: 24,
        type: 10,
        name: 'Отправить 5 подарков &laquo;Лайк&raquo;',
        img: 'https://i.ibb.co/d6YGkWv/image.png',
        need: 5,
        reward: [0, 10000],
        probability: 0.4
    },
    {
        id: 25,
        type: 11,
        name: 'Отправить 2 подарка &laquo;Бро!&raquo;',
        img: 'https://i.ibb.co/Zh4YbJb/image.png',
        need: 2,
        reward: [0, 15000],
        probability: 0.6
    },
    {
        id: 26,
        type: 12,
        name: 'Открыть 5 кейсов &laquo;Кри&raquo;',
        img: 'assets/img/keys.webp" style="filter: hue-rotate(155deg);',
        need: 5,
        reward: [0, 25000],
        probability: 0.1
    },
    {
        id: 27,
        type: 13,
        name: 'Открыть 10 кейсов за 5000 кристаллов',
        img: 'assets/img/keys.webp"',
        need: 10,
        reward: [0, 10000],
        probability: 0.8
    },
    {
        id: 28,
        type: 14,
        name: 'Открыть 8 кейсов за 10 000 кристаллов',
        img: 'assets/img/keys.webp"',
        need: 8,
        reward: [0, 25000],
        probability: 0.2
    },
    {
        id: 29,
        type: 15,
        name: 'Открыть 3 кейса &laquo;Опыт&raquo;',
        img: 'assets/img/keys.webp" style="filter: hue-rotate(245deg)"',
        need: 3,
        reward: [0, 15000],
        probability: 0.2
    },
    {
        id: 30,
        type: 16,
        name: 'Открыть 10 кейсов за 20 000 кристаллов',
        img: 'assets/img/keys.webp',
        need: 10,
        reward: [0, 50000],
        probability: 0.2
    },
    {
        id: 31,
        type: 17,
        name: 'Активировать 10 подарочных карт',
        img: 'assets/img/task1.webp',
        need: 10,
        reward: [0, 5000],
        probability: 0.7
    },
    {
        id: 32,
        type: 6,
        name: 'Сбросить 5 золотых ящика',
        img: '/img/shop/mg-box2.webp',
        need: 5,
        reward: [0, 20000],
        probability: 0.6
    },
    {
        id: 33,
        type: 6,
        name: 'Сбросить 1 золотой ящик',
        img: '/img/shop/mg-box2.webp',
        need: 5,
        reward: [0, 5000],
        probability: 0.6
    },
    {
        id: 34,
        type: 6,
        name: 'Сбросить 8 золотых ящика',
        img: '/img/shop/mg-box2.webp',
        need: 5,
        reward: [0, 30000],
        probability: 0.6
    },
];

function getTask(id, res){
    for(let task of Tasks){
        if(task.id == id){
            if (res == undefined) return task;
            else if(res == 'img') return task.img;
            else if(res == 'name') return task.name;
            else return task;
        }
    }
}

module.exports = {
    Tasks, 
    getTask
}