'use-strict'

import { getAllCombinations, getRandomFromArray, shuffleArray } from './utils';
import { PotionBlueprint, PotionFactory } from '../model/Potion';
import { PotionSideEffect } from '../model/PotionEffect';

/**
* Generates a new potion object with random effects and side effects, within the specified parameters.
* @param {Object} options - An object containing the options for generating the potion.
* @param {number} [options.minEffects=1] - The minimum number of effects for the potion.
* @param {number} [options.maxEffects=2] - The maximum number of effects for the potion.
* @param {Array} [options.possibleEffects=[]] - An array of possible PotionEffects for the potion.
* @param {number} [options.minSideEffects=0] - The minimum number of side effects for the potion.
* @param {number} [options.maxSideEffects=5] - The maximum number of side effects for the potion.
* @param {Array} [options.possibleSideEffects=[]] - An array of possible PotionSideEffects for the potion.
* @param {number} [options.minPrice=0] - The minimum price for the potion.
* @param {number} [options.maxPrice=Infinity] - The maximum price for the potion.
* @param {number} [options.price=null] - The desired price for the potion (if specified, overrides minPrice and maxPrice).

* @throws {Error} Not enough effects to generate potion.
* @throws {Error} Not enough side effects to generate potion.
* @throws {Error} Could not generate potion with the given parameters.

* @returns {Object} A new potion object with random effects and side effects.
*/

function generatePotion({
    minEffects = 1, maxEffects = 2, possibleEffects = [],
    minSideEffects = 0, maxSideEffects = 5, possibleSideEffects = [],
    minPrice = 0, maxPrice = Infinity, price = null
}) {

    if (minEffects > maxEffects) {
        console.log("Not enough effects to generate potion")
        throw new Error("Not enough effects to generate potion");
    }
    if (minSideEffects > maxSideEffects) {
        console.log("Not enough side effects to generate potion")
        throw new Error("Not enough side effects to generate potion");
    }

    //Get array of available levels from possible effects
    const possibleLevels = getLevelArrayFromEffects(possibleEffects);

    //Get array of available categories from possible side effects
    const possibleSideEffectsCategories = getCategoryArrayFromSideEffects(possibleSideEffects);

    //Generate all possible potion blueprints with the parameters
    const allLevelsCombinations = getAllCombinations(possibleLevels, minEffects, maxEffects);
    const allCategoriesCombinations = getAllCombinations(possibleSideEffectsCategories, minSideEffects, maxSideEffects);

    const allBlueprints = generateBlueprints(
        allLevelsCombinations, allCategoriesCombinations
    );

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
        throw new Error("Could not generate potion with the given parameters");
}

function getLevelArrayFromEffects(effects) {
    return effects.reduce(
        (levels, effect) => {
            return levels.includes(effect.level) ?
                levels :
                [...levels, effect.level];
        },
        []
    );
}

function getCategoryArrayFromSideEffects(sideEffects) {
    return sideEffects.reduce(
        (categories, sideEffects) => {
            return categories.includes(sideEffects.category) ?
                categories :
                [...categories, sideEffects.category];
        },
        []
    );
}

function generateBlueprints(levelsCombinations, categoriesCombinations) {
    let allBlueprints = [];
    levelsCombinations.forEach((levels) => {
        categoriesCombinations.forEach((categories) => {
            allBlueprints = [...allBlueprints,
            new PotionBlueprint(
                { effectLevels: levels, sideEffectCategories: categories }
            )
            ];
        });
    });
    return allBlueprints;
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
        // console.log("effectData", effectData)

        //Add the effect to the array
        // effects.push(new PotionEffect(effectData));
        effects.push(effectData);
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

export default generatePotion
export {
    generatePotion,
    getAllCombinations,
    getLevelArrayFromEffects,
    getCategoryArrayFromSideEffects,
    generateBlueprints,
    createPotionFromBlueprint,
    selectRandomEffects,
    selectRandomSideEffects,
}