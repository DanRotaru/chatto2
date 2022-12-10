const ranks = [
    [1, "Новобранец", 0, 30],
    [2, "Рядовой", 30, 100],
    [3, "Ефрейтор", 100, 500],
    [4, "Капрал", 500, 1200],
    [5, "Мастер-капрал", 1200, 3000],
    [6, "Сержант", 3000, 5000],
    [7, "Штаб-сержант", 5000, 8000],
    [8, "Мастер-сержант", 8000, 20000],
    [9, "Первый сержант", 20000, 29000],
    [10, "Сержант-майор", 29000, 42000],
    [11, "Уорэнт-офицер 1", 42000, 58000],
    [12, "Уорэнт-офицер 2", 58000, 77000],
    [13, "Уорэнт-офицер 3", 77000, 99000],
    [14, "Уорэнт-офицер 4", 99000, 125000],
    [15, "Уорэнт-офицер 5", 125000, 155000],
    [16, "Мл. лейтенант", 155000, 190000],
    [17, "Лейтенант", 190000, 250000],
    [18, "Ст. лейтенант", 250000, 310000],
    [19, "Капитан", 310000, 350000],
    [20, "Майор", 350000, 400000],
    [21, "Подполковник", 400000, 466000],
    [22, "Полковник", 466000, 515000],
    [23, "Бригадир", 515000, 555000],
    [24, "Генерал-майор", 555000, 600000],
    [25, "Генерал-лейтенант", 600000, 680000],
    [26, "Генерал", 680000, 750000],
    [27, "Маршал", 750000, 800000],
    [28, "Фельдмаршал", 800000, 825000],
    [29, "Командор", 825000, 899000],
    [30, "Генералиссимус", 899000, 1000000],
    [31, "Легенда", 1000000, 1000000]
];


/**
 * @param {number} score  - Score number
 * @param {number} what What to return
 - default: rank_id,
 - 1: rank_name,
 - 2: rank_needle,
 - 3: rank_needle_prev,
 - 4: JSON response with all previous
 - 5: rank_id with vip,
 - > 1000: substitue last parameter (vip),
 * @param {number} vip Date number > Date.now()
 */

function getRank(score, what, vip) {
    let rank_name, rank_id, rank_needle, rank_prev_needle, data = '';
    if (score <= 0) {
        rank_name = ranks[0][1];
        rank_id = 1;
        rank_needle = ranks[0][3];
        rank_prev_needle = 0;
    }
    else if(score > ranks[30][2]){
        //Легенда (0)
        let main = ranks[30][2];
    
        //Интервал (между новыми званиями)
        let limits = 100000;

        //Число легенды
        let n = Math.floor((score - main) / limits) + 1;
        rank_name = "Легенда " + n;
        rank_id = "31";
        rank_needle = (main + limits * n);
        rank_prev_needle = (main + limits * (n - 1));
    }
    else {
        for (let i = 0; i < ranks.length; i++) {
            if (score >= ranks[i][2] && score < ranks[i][3]) {
                rank_name = ranks[i][1];
                rank_id = ranks[i][0];
                rank_needle = ranks[i][3];
                if(i == 0) rank_prev_needle = 0;
                else rank_prev_needle = ranks[i - 1][3];
            }
        }
    }

    let progress = 0;
    progress = ((score - rank_prev_needle) / (rank_needle - rank_prev_needle) * 100);


    let rank_idv = rank_id;
    rank_idv = vip > Date.now() ? 'v' + rank_id : rank_id;

    if(what == 0 || what == undefined) data = rank_id;
    else if(what == 1) data = rank_name;
    else if(what == 2) data = rank_needle;
    else if(what == 3) data = rank_prev_needle;
    else if(what == 5) {
        // rank_id with vip
        data = vip > Date.now() ? 'v' + rank_id : rank_id;
    }
    else if(what == 4) data = {
        score: score,
        name: rank_name,
        id: rank_id,
        idV: rank_idv,
        needle: rank_needle,
        prev: rank_prev_needle,
        progress: progress
    }
    else if(what > 1000){
        data = what > Date.now() ? 'v' + rank_id : rank_id;
    }

    return data;
}
module.exports = getRank;