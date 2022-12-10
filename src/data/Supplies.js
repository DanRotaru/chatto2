const Supplies = [{
        "id": 1,
        "name": "Золотой ящик",
        "price": 20000,
        "description": "Специальный припас, позволяющий сбросить стандартный золотой ящик в чате. Сброшенный ящик всегда содержит 1000 кристаллов, в том числе во время праздничных акций.",
        "image": "assets/img/g-gold.webp",
        "unic": 0
    },
    {
        "id": 2,
        "name": "Батарея",
        "price": 0,
        "description": "Специальный припас, позволяющий заработать дополнительный опыт и кристаллы, после чего батарейки уменьшаются на 1. Одна батарейка даёт +5 дополнительный опыт или +10 дополнительные кристаллы за сообщение.",
        "image": "assets/img/battery.webp",
        "unic": 1
    },
    {
        "id": 3,
        "name": "Механик",
        "price": 100000,
        "description": "+ 1 опыта",
        "image": "assets/garage/drone/1.webp",
        "unic": 2
    },
    {
        "id": 4,
        "name": "Драйвер",
        "price": 200000,
        "description": "+ 2 опыта",
        "image": "assets/garage/drone/2.webp",
        "unic": 2
    },
    {
        "id": 5,
        "name": "Снабженец",
        "price": 300000,
        "description": "+ 3 опыта",
        "image": "assets/garage/drone/3.webp",
        "unic": 2
    },
    {
        "id": 6,
        "name": "Ловкач",
        "price": 400000,
        "description": "+ 4 опыта",
        "image": "assets/garage/drone/4.webp",
        "unic": 2
    },
    {
        "id": 7,
        "name": "Спринтер",
        "price": 500000,
        "description": "+ 5 опыта",
        "image": "assets/garage/drone/6.webp",
        "unic": 2
    },
    {
        "id": 8,
        "name": "Кемпер",
        "price": 800000,
        "description": "+ 8 опыта",
        "image": "assets/garage/drone/7.webp",
        "unic": 2
    },
    {
        "id": 9,
        "name": "Спасатель",
        "price": 1000000,
        "description": "+ 10 опыта",
        "image": "assets/garage/drone/8.webp",
        "unic": 2
    },
];

function getSupply(id, res){
    for(let supply of Supplies){
        if(supply.id == id){
            if (res == undefined) return supply;
            else if(res == 'img') return supply.image;
            else if(res == 'name') return supply.name;
            else return supply;
        }
    }
}

module.exports = {
    getSupply,
    Supplies
}