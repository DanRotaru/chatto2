const Promocodes = [
    {
        type: 1,
        name: '',
        price: 1,
        img: '',
        reward: ''
    }
];
function getPromocode(id, res){
    for(let promocode of Promocodes){
        if(promocode.id == id){
            if (res == undefined) return promocode;
            else if(res == 'img') return promocode.image;
            else if(res == 'name') return promocode.name;
            else if(res == 'img-name') return {name: promocode.name, img: promocode.image};
            else return gift;
        }
    }
}

module.exports = {
    Promocodes,
    getPromocode
}