'use-strict'

import { Potion } from "../model/Potion";
const loadPotionsFromStorage = (storageKey) => {
    const savedPotionsString = localStorage.getItem(storageKey);

    return (
        (savedPotionsString && JSON.parse(savedPotionsString.length) > 0) ?
            JSON.parse(savedPotionsString).map((potionString) => Potion.parse(potionString)) :
            []
    )
}

export { loadPotionsFromStorage }