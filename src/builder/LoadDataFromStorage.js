'use-strict'

import { Potion, PotionBlueprint } from "../model/Potion";
import { PotionEffect, PotionSideEffect } from "../model/PotionEffect";

const loadPotionsFromStorage = (storageKey) => {
    const savedPotionsString = localStorage.getItem(storageKey);
    console.log("Saved data: ", savedPotionsString);

    return (
        (savedPotionsString && JSON.parse(savedPotionsString.length) > 0)?
            JSON.parse(savedPotionsString).map((potionString) => Potion.parse(potionString)) :
            []
    )
}

export { loadPotionsFromStorage }