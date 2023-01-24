'use-strict'

import { PotionEffect, PotionSideEffect } from '../model/PotionEffect';
import effects_data from '../data/potion_effects.json';
import side_effects_data from '../data/potion_side_effects.json';

const build = function buildData() {
    return {
        effects: buildEffects(),
        side_effects: buildSideEffects(),
    };
}

function buildEffects() {
    const effects = effects_data.map((effect_data) => {
        const effect = new PotionEffect(effect_data);
        return effect;
    });

    return effects;
}

function buildSideEffects() {
    const side_effects = side_effects_data.map((side_effect_data) => {
        const side_effect = new PotionSideEffect(side_effect_data);
        return side_effect;
    });

    return side_effects;
}

export {build}