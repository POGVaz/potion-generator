'use-strict'

import parse from 'json-templates';
import getRandom from 'random-weight';

import potion_descriptions from '../data/potion_descriptions.json';
import effects_cost from '../data/potion_effects_cost.json';
import side_effects_cost from '../data/potion_side_effects_modifier.json';

import { convertArrayToText, getRandomFromArray } from '../utils';
import { PotionEffect, PotionSideEffect } from './PotionEffect';

const EFFECTS_MULTIPLIER = 1.5;

class PotionFactory {

    createPotion(potionBlueprint, possibleEffects, possibleSideEffects) {

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

        //Make the potion:
        return new Potion({ blueprint: potionBlueprint, effects, sideEffects });
    }
}

class Potion {
    #name;

    constructor(
        {blueprint, effects = [], sideEffects = []}
    ) {
        this.effects = effects;
        this.sideEffects = sideEffects;
        this.blueprint = blueprint
    }

    get value() {
        return Math.round(this.blueprint.value);
    }

    get name() {
        return (this.#name?
            this.#name :
            this.#name = this.generateName()
        );
    }

    generateName() {
        const template = parse(potion_descriptions.potion_name_scheme);

        //Get a random potion archetype:
        const potionArchetype = getRandom(
            potion_descriptions.potion_archetypes,
            (archetype) => archetype.weight
        ).text;

        //Assemble effects as noun(s)
        const nouns = convertArrayToText(
            this.effects.map((effect) => effect.name)
        );

        //Assemble side effects as adjective(s)
        let firstAdjective;
        let adjectives;
        switch (this.sideEffects.length) {
            case 0:
                firstAdjective = '';
                adjectives = '';
            break;

            case 1:
                firstAdjective = '';
                adjectives = this.sideEffects[0].adjective + " ";
            break;

            case 2:
                firstAdjective = this.sideEffects[1].adjective + " ";
                adjectives = this.sideEffects[0].adjective + " ";
            break;

        
            default:
                firstAdjective = this.sideEffects[0].adjective + " ";
                adjectives = convertArrayToText(
                    this.sideEffects.slice(1).map((sideEffect) => sideEffect.adjective)
                );
            break;
        }
        
        return template({
            archetype: potionArchetype, nouns, firstAdjective, adjectives
        });
    }
}

class PotionBlueprint {
    constructor(
        {effectLevels = [], sideEffectCategories = []}
    ) {
        this.effectLevels = effectLevels;
        this.sideEffectCategories = sideEffectCategories;
    }

    get value() {
        //Get base value from effects
        const baseValue = this.effectLevels.reduce(
            (accumulatedValue, level) => {
                return accumulatedValue + effects_cost[level];
            }, 0
        ) * EFFECTS_MULTIPLIER**(this.effectLevels.length - 1);

        //Get modifier from Side Effects
        const modifier = this.sideEffectCategories.reduce(
            (accumulatedValue, category) => {
                return accumulatedValue * side_effects_cost[category];
            }, 1
        );

        return baseValue*modifier;
    }
}

export {
    Potion,
    PotionFactory,
    PotionBlueprint,
}