'use-strict'

import { getCombinationsWithRepetition, getRandomFromArray } from './utils';
import { PotionBlueprint, PotionFactory } from './model/Potion';

function generatePotion({
    minEffects = 1, maxEffects = 2, possibleEffects = [],
    minSideEffects = 0, maxSideEffects = 5, possibleSideEffects = [],
    minPrice = 0, maxPrice = Infinity, price = null,
}) {

    //Get available levels from possible effects
    const possibleLevels = possibleEffects.reduce(
        (levels, effect) => {
            return levels.includes(effect.level) ?
                levels :
                [...levels, effect.level];
        },
        []
    );

    //Get available levels from possible effects
    const possibleSideEffectsCategories = possibleSideEffects.reduce(
        (categories, sideEffects) => {
            return categories.includes(sideEffects.category) ?
                categories :
                [...categories, sideEffects.category];
        },
        []
    );

    //Generate all possible potion blueprints with the parameters
    const allLevelsCombinations = getAllCombinations(possibleLevels, minEffects, maxEffects);
    const allCategoriesCombinations = getAllCombinations(possibleSideEffectsCategories, minSideEffects, maxSideEffects);

    let allBlueprints = [];
    allLevelsCombinations.forEach((levels) => {
        allCategoriesCombinations.forEach((categories) => {
            allBlueprints = [...allBlueprints,
            new PotionBlueprint(
                { effectLevels: levels, sideEffectCategories: categories }
            )
            ];
        });
    });

    //Filter all blueprints to get only those within the price range
    if (price !== null) {
        minPrice = price * 0.90;
        maxPrice = price * 1.1;
    }
    const possibleBlueprints = allBlueprints.filter((blueprint) => {
        return (blueprint.value >= minPrice && blueprint.value <= maxPrice);
    })

    //Create a new potion with a random blueprint:
    const blueprint = getRandomFromArray(possibleBlueprints);
    const potionFactory = new PotionFactory();
    return potionFactory.createPotion(blueprint, possibleEffects, possibleSideEffects);
}

function getAllCombinations(array, min, max) {
    let returnArray = [];
    for (let index = min; index <= max; index++) {
        returnArray = [...returnArray, ...getCombinationsWithRepetition(array, index)];
    }
    return returnArray;
}

export { generatePotion }