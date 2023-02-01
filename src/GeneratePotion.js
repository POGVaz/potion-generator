'use-strict'

import { getCombinationsWithRepetition, getRandomFromArray, shuffleArray } from './utils';
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

    //Get available categories from possible side effects
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
    });

    //Attempts to create a new potion with a blueprint

    //Shuffle the blueprint array so we can use the next option if the first is bad
    const shuffledBlueprints = shuffleArray(possibleBlueprints);

    let newPotion;
    //Tries a blueprint until one makes a valid potion
    shuffledBlueprints.some((blueprint) => {
        try {
            newPotion = createPotionFromBlueprint(blueprint, possibleEffects, possibleSideEffects);
            return true;
        } catch (error) {
            // console.log(error);
            return false;
        }
    });

    if (newPotion)
        return newPotion;
    else
        throw new Error("Could not generate potion");
}

function getAllCombinations(array, min, max) {
    let returnArray = [];
    for (let index = min; index <= max; index++) {
        returnArray = [...returnArray, ...getCombinationsWithRepetition(array, index)];
    }
    return returnArray;
}

function createPotionFromBlueprint(potionBlueprint, possibleEffects, possibleSideEffects) {
    //Select random effects:
    const effects = selectRandomEffects(potionBlueprint, possibleEffects, possibleSideEffects);

    //Select random side effects:
    const sideEffects = selectRandomSideEffects(potionBlueprint, possibleSideEffects, effects);

    const potionFactory = new PotionFactory();
    return potionFactory.createPotion(potionBlueprint, effects, sideEffects);
}

function selectRandomEffects(potionBlueprint, possibleEffects, possibleSideEffects = []) {
    const effects = [];

    potionBlueprint.effectLevels.forEach((level) => {

        //Filter the possible effects
        const filteredPossibleEffects = possibleEffects.filter((effect) => {
            return (
                //Is the level we are looking for
                effect.level === level &&

                //Has not been used yet
                !effects.some((previousEffect) => effect.id === previousEffect.id) &&

                //Has compatible side effects
                possibleSideEffects.filter(
                    (sideEffect) => !sideEffect.incompatibleWith.includes(effect.id)
                ).length >= 1
            );
        });

        //Check if any effect satisfy the conditions
        if (filteredPossibleEffects.length < 1) {
            throw new Error("No valid effects");
        }

        //Get a random effect
        let effectData = getRandomFromArray(filteredPossibleEffects);

        //Add the effect to the array
        effects.push(new PotionEffect(effectData));
    });

    return effects;
}

function selectRandomSideEffects(potionBlueprint, possibleSideEffects, usedEffects) {
    const sideEffects = [];

    potionBlueprint.sideEffectCategories.forEach((category) => {

        //Filter the possible side effects
        const filteredPossibleSideEffects = possibleSideEffects.filter((sideEffect) => {
            return (
                //Is the category we are looking for
                sideEffect.category === category &&

                //Has not been used yet
                !sideEffects.some((previousSideEffect) => sideEffect.id === previousSideEffect.id) &&

                //The same type has not been used yet (except null)
                (sideEffect.type === null || !sideEffects.some((previousSideEffect) => sideEffect.type === previousSideEffect.type)) &&

                //An incompatible side effect has not been used yet
                !sideEffects.some((previousSideEffect) => sideEffect.incompatibleWith.includes(previousSideEffect.id)) &&

                //An incompatible effect has not been used yep
                !usedEffects.some((previousEffect) => sideEffect.incompatibleWith.includes(previousEffect.id))
            );
        });

        //Check if any effect satisfy the conditions
        if (filteredPossibleSideEffects.length < 1) {
            throw new Error("No valid side effects");
        }

        //Get a random effect
        const sideEffectData = getRandomFromArray(filteredPossibleSideEffects);

        //Add the effect to the array
        sideEffects.push(
            new PotionSideEffect(sideEffectData)
        );
    });

    return sideEffects;
}

export { generatePotion }