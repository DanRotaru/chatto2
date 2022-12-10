const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true,
    },
    hull: {
        type: String,
        default: 'hanter'
    },
    turret: {
        type: String,
        default: 'smoki'
    },
    paint: {
        type: Number,
        default: 1
    },
    cases: Array,
    casesTimer: Number,
    drone: Number,
    batteries: Number,
    golds: Number,
    wasp: Number,
    hornet: Number,
    hanter: Number,
    dictator: Number,
    viking: Number,
    titan: Number,
    mamont: Number,
    wasp_xt: Number,
    hornet_xt: Number,
    viking_xt: Number,
    mamont_xt: Number,
    smoki: Number,
    fire: Number,
    twins: Number,
    railgun: Number,
    izida: Number,
    grom: Number,
    friz: Number,
    rik: Number,
    shaft: Number,
    molot: Number,
    vulkan: Number,
    striker: Number,
    magnum: Number,
    gauss: Number,
    fire_xt: Number,
    railgun_xt: Number,
    grom_xt: Number,
    vulkan_xt: Number,
    smoki_xt: Number,
    grom_lc: Number,
    viking_lc: Number,
    titan_xt: Number,
    friz_xt: Number,
    rik_xt: Number,
    shaft_xt: Number,
    dictator_xt: Number,
    fire_dc: Number,
    izida_xt: Number,
    twins_xt: Number,
    hanter_xt: Number,
    magnum_xt: Number,
    railgun_lc: Number,
    molot_xt: Number,
    hornet_lc: Number,
    shaft_lc: Number,
    striker_xt: Number,
    grom_p: Number,
    viking_p: Number,
    hornet_p: Number,
    molot_tc: Number,
    smoki_lc: Number,
    fire_lc: Number,
    friz_lc: Number,
    twins_lc: Number,
    rik_lc: Number,
    izida_lc: Number,
    dictator_lc: Number,
    hanter_lc: Number,
    mamont_lc: Number,
    titan_lc: Number,
    wasp_lc: Number,
    railgun_p: Number,
    gauss_p: Number,
    hanter_p: Number,
    titan_p: Number,
    vulkan_p: Number,
    viking_ut: Number,
    grom_ut: Number,
    railgun_ut: Number,
    gauss_xt: Number,
    hanter_ut: Number,
    hornet_ut: Number,
    gauss_ut: Number,
    vulkan_ut: Number,
    jgrT: Number,
    jgrH: Number,
    sonik: Number,
    ares_n: Number,
    hopper_n: Number
}, {versionKey: false});

module.exports = model('Garages', schema)