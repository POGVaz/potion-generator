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

var filteredArray = array.reduce((filtered, option) => {
    if (option.length === 5) {
        filtered.push(option);
    }
    return filtered;
}, []);

console.log(filteredArray);