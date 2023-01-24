'use-strict'

// import effects from './data/potion_effects.json';
// const effects_data = require('./data/potion_effects.json')

// console.log(effects_data[0].description);

// const parse = require("json-templates");

// const template = parse("{{archetype}} {{adjective.0: }}de {{noun.0}}{{foo:}}");

// console.log(template({ archetype: "Poção", noun: ["Invisibilidade"] }));

var combinations = require('combinations');
// var getRandom = require('random-weight').default;

var array = ["apple", "banana", "lemon", "mango"];

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

console.log(getRandomFromArray(array));

// var newArray = [...array, ...array];

// console.log(combinations(newArray, 1, 2).reduce((accumulated, current) => {return accumulated.includes(current)? accumulated : [...accumulated, current]}, []));
// console.log([['apple', 'lemon']].flat().includes(['apple', 'lemon'].join()));

