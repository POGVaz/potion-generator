'use-strict'
import { Potion } from './model/Potion';
const { generatePotion } = require("./GeneratePotion");

const test = (effects, side_effects) => {
    const potion = generatePotion({
        minPrice: 0,
        maxPrice: 100,
        minEffects: 2,
        maxEffects: 2,
        minSideEffects: 2,
        maxSideEffects: 2,
        possibleEffects: effects,
        possibleSideEffects: side_effects,
        amount: 5,
    });

    console.log("Potion: ", potion);
    // console.log(JSON.stringify(potion));
    console.log("Stringified: ", potion.stringify());

    console.log("Parse: ", Potion.parse(potion.stringify()));
}

export default test;