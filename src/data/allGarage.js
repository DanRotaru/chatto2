const allTurrets = ['smoki', 'fire', 'twins', 'railgun', 'izida', 'grom', 'friz', 'rik', 'shaft', 'molot', 'vulkan', 'striker', 'magnum', 'gauss', 'fire_xt', 'railgun_xt', 'grom_xt', 'vulkan_xt', 'smoki_xt', 'grom_lc', 'friz_xt', 'rik_xt', 'shaft_xt', 'fire_dc', 'izida_xt', 'twins_xt', 'magnum_xt', 'railgun_lc', 'molot_xt', 'shaft_lc', 'striker_xt', 'grom_p', 'molot_tc', 'smoki_lc', 'fire_lc', 'friz_lc', 'twins_lc', 'rik_lc', 'izida_lc', 'railgun_p', 'gauss_p', 'vulkan_p', 'grom_ut', 'railgun_ut', 'gauss_xt', 'gauss_ut', 'vulkan_ut', 'jgrT'];
const allHulls = ['wasp', 'hornet', 'hanter', 'dictator', 'viking', 'titan', 'mamont', 'wasp_xt', 'hornet_xt', 'viking_xt', 'mamont_xt', 'viking_lc', 'titan_xt', 'dictator_xt', 'dictator_lc', 'hanter_lc', 'mamont_lc', 'titan_lc', 'wasp_lc', 'hanter_xt', 'hornet_lc', 'viking_p', 'hornet_p', 'hanter_p', 'titan_p', 'viking_ut', 'hanter_ut', 'hornet_ut', 'jgrH', 'sonik', 'ares_n', 'hopper_n'];
const allGarage = allTurrets.concat(allHulls);

module.exports = {
    allTurrets,
    allHulls,
    allGarage
}