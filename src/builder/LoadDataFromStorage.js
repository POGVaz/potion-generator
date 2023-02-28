'use-strict'

import { Potion, PotionBlueprint } from "../model/Potion";
import { PotionEffect, PotionSideEffect } from "../model/PotionEffect";

const loadPotionsFromStorage = (storageKey) => {
    const savedPotionsString = localStorage.getItem(storageKey);
    if (savedPotionsString) {
        const savedLocalPotions =
            JSON.parse(savedPotionsString).map((potionData) => {

                potionData.effects = potionData.effects.map((effectData) => {
                    return new PotionEffect(effectData);
                });

                potionData.sideEffects = potionData.sideEffects.map((sideEffectData) => {
                    return new PotionSideEffect(sideEffectData);
                });

                potionData.blueprint = new PotionBlueprint(potionData.blueprint);

                return new Potion(potionData);
            });
        // console.log("savedLocalPotions:", savedLocalPotions);
        return savedLocalPotions;
    }
    else return [];
}

export { loadPotionsFromStorage }