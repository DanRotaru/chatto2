const Gifts = [
    {
        "id": "special_premium",
        "name": "Премиум аккаунт",
        "price": 0,
        "description": "Приобретая премиум аккаунт, вы получаете ряд преимуществ — на 100% больше кристаллов, на 100% больше опыта за каждое сообщение.",
        "image": "img/shop/premium.webp"
    },
    {
        "id": "special_kcard",
        "name": "Кристальная карта",
        "price": 0,
        "description": "Приобретая данный предмет вы сможете передавать кристаллы любому игроку по 10% цене. Минимальная передача: 1 000. Для передачи кристаллов введите команду /transfer логин количество или же Настройки - Прочее - Передача кри",
        "image": "img/shop/card_kry.webp"
    },
    {
        "id": "special_promocard",
        "name": "Карта создателя промо-кодов",
        "price": 0,
        "description": "Приобретая данный предмет вы сможете создавать промо-коды с кристаллами. Срок действии промо-кода будет 30 дней, в отличии от обычной подарочной карты (где срок действии карты = 7 дней). Как и с кристальной картой, кристаллы спишутся с вашего аккаунта + 10%. Минимальное количество кристаллов в карте: 5 000",
        "image": "img/shop/card-create.webp"
    },
    {
        "id": "special_premium_promocard",
        "name": "Карта премиум создателя промо-кодов",
        "price": 0,
        "description": "Приобретая данный предмет вы сможете создавать премиум промо-коды которые могут содержать: кристаллы, премиум аккаунт, золотые ящики, контейнеры, батарейки, койны и подарки (с возможностью писать текст). Срок действии промо-кода будет 30 дней, в отличии от обычной подарочной карты (где срок действии карты = 7 дней). Как и с кристальной картой, кристаллы спишутся с вашего аккаунта + 10%, но комиссия при передаче койнов будет составлять 1 койн (в назависимо от кол.)",
        "image": "img/shop/card-create.webp"
    },
    {
        "id": 1,
        "name": "Значок",
        "price": 3000,
        "description": "Фирменный значок - самый простой способ сообщить другу, что он - настоящий танкист.",
        "image": "https://i.ibb.co/Cw8DKvP/image.png"
    },
    {
        "id": 11,
        "name": "Ёлочка",
        "price": 5000,
        "description": "Ёлочка — главный символ рождества.",
        "image": "https://i.ibb.co/rxbwHN1/image.png"
    },
    {
        "id": 12,
        "name": "Снеговик",
        "price": 7000,
        "description": "Снеговик...",
        "image": "https://i.ibb.co/YyYRZJx/image.png"
    },
    {
        "id": 13,
        "name": "Васпосмока",
        "price": 8000,
        "description": "Васпосмока...",
        "image": "https://i.ibb.co/Vpbh5dM/image.png"
    },
    {
        "id": 14,
        "name": "Ёлочная игрушка",
        "price": 10000,
        "description": "Просто ёлочная игрушка",
        "image": "https://i.ibb.co/xGNcK8h/image.png"
    },
    {
        "id": 2,
        "name": "Лайк",
        "price": 10000,
        "description": "Отправь лайк тому, кто впечатлил тебя.",
        "image": "https://i.ibb.co/d6YGkWv/image.png"
    },
    {
        "id": 3,
        "name": "Дизлайк",
        "price": 10000,
        "description": "Дизлайк — универсальный ответ на всё, что тебе не нравится. ",
        "image": "https://i.ibb.co/xCpZhwz/image.png"
    },
    {
        "id": 4,
        "name": "Голдолов",
        "price": 15000,
        "description": "Лучший способ поздравления с взятием большого количество голдов.",
        "image": "https://i.ibb.co/p1VFg3r/image.png"
    },
    {
        "id": 5,
        "name": "Клешни рака",
        "price": 15000,
        "description": "Клац-клац!",
        "image": "https://i.ibb.co/jJSCPXw/image.png"
    },
    {
        "id": 6,
        "name": "Бро!",
        "price": 20000,
        "description": "Танковая статуэтка, дающая обладателю +1 к крутости!",
        "image": "https://i.ibb.co/Zh4YbJb/image.png"
    },
    {
        "id": 7,
        "name": "Танковый шлем",
        "price": 20000,
        "description": "Танковый шлем — неотъемлемый элемент экипировки опытного бойца.",
        "image": "https://i.ibb.co/b1CMvYg/image.png"
    },
    {
        "id": 8,
        "name": "Гаечный ключ",
        "price": 20000,
        "description": "Золотой гаечный ключ, который не стыдно подарить даже самому искушённому танкисту.",
        "image": "https://i.ibb.co/WvhQZvR/image.png"
    },
    {
        "id": 9,
        "name": "На удачу!",
        "price": 20000,
        "description": "Подкова — это символ счастья и удачи. Подари её другу, которому искренне желаешь победы в «Безумных выходных».",
        "image": "https://i.ibb.co/B2KpsBz/image.png"
    },
    {
        "id": 16,
        "name": "Орден",
        "price": 20000,
        "description": "Отличный способ поздравить танкистов с Днём Победы.",
        "image": "https://i.ibb.co/tprrL6m/image.png"
    },
    {
        "id": 17,
        "name": "Пара носков",
        "price": 20000,
        "description": "Холодные ноги могут стать причиной плохого самочувствия, которое помешает твоей победе в бою. Эти носки помогут сохранить ноги в тепле, а боевой дух — на высоте.",
        "image": "https://i.ibb.co/XWChrKm/image.png"
    },
    {
        "id": 18,
        "name": "Бинокль",
        "price": 20000,
        "description": "Незаменимый инструмент для опытного бойца, который предпочитает разведать обстановку на поле боя перед тем, как броситься в атаку.",
        "image": "https://i.ibb.co/TWbDtRJ/image.png"
    },
    {
        "id": 20,
        "name": "Тотем",
        "price": 30000,
        "description": "Снимает усталость и придаёт силы для продолжения фрагобойни. Но это не точно.",
        "image": "https://i.ibb.co/VvB9qNc/image.png"
    },
    {
        "id": 10,
        "name": "Золотые часы",
        "price": 50000,
        "description": "Лучший мужской подарок!",
        "image": "https://i.ibb.co/6D957m2/image.png"
    },
    {
        "id": 15,
        "name": "Синий шар",
        "price": 100000,
        "description": "Легендарный синий шар. Да, это он.",
        "image": "https://i.ibb.co/S0x6h3j/image.png"
    },
    {
        "id": 19,
        "name": "Танк мечты",
        "price": 100000,
        "description": "Незаменимый инструмент для опытного бойца, который предпочитает разведать обстановку на поле боя перед тем, как броситься в атаку.",
        "image": "https://i.ibb.co/f856fY6/image.png"
    }
];
function getGift(id, res){
    for(let gift of Gifts){
        if(gift.id == id){
            if (res == undefined) return gift;
            else if(res == 'img') return gift.image;
            else if(res == 'name') return gift.name;
            else if(res == 'img-name') return {name: gift.name, img: gift.image};
            else return gift;
        }
    }
}

module.exports = {
    Gifts,
    getGift
}