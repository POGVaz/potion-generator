'use-strict'

import { getCombinationsWithRepetition, getRandomFromArray } from './utils';
import { PotionBlueprint, PotionFactory } from './model/Potion';
import { PotionEffect, PotionSideEffect } from './model/PotionEffect';

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
    const potionBlueprint = getRandomFromArray(possibleBlueprints);

    //Select random effects:
    const effects = [];
    potionBlueprint.effectLevels.forEach((level) => {
        let effectData = getRandomFromArray(
            possibleEffects.filter((effect) => {
                return (
                    //Is the level we are looking for
                    effect.level === level &&
                    //Has not been used yet
                    !effects.some((previousEffect) => effect.id === previousEffect.id)
                );
            })
        )
        effects.push(new PotionEffect(effectData));
    });

    //Select random side effects:
    const sideEffects = [];
    potionBlueprint.sideEffectCategories.forEach((category) => {
        sideEffects.push(
            new PotionSideEffect(
                getRandomFromArray(
                    possibleSideEffects.filter((sideEffect) => {
                        return (
                            //Is the category we are looking for
                            sideEffect.category === category &&
                            //Has not been used yet
                            !sideEffects.some((previousSideEffect) => sideEffect.id === previousSideEffect.id)
                        );
                    })
                )
            )
        );
    });

    const potionFactory = new PotionFactory();
    return potionFactory.createPotion(potionBlueprint, effects, sideEffects);
}

function getAllCombinations(array, min, max) {
    let returnArray = [];
    for (let index = min; index <= max; index++) {
        returnArray = [...returnArray, ...getCombinationsWithRepetition(array, index)];
    }
    return returnArray;
}

export { generatePotion }