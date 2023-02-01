'use-strict'

import parse from 'json-templates';
import getRandom from 'random-weight';

import { potionImages } from '../builder/ImageBuilder';
import { convertArrayToText, getRandomFromArray } from '../utils';
import { PotionEffect, PotionSideEffect } from './PotionEffect';

const EFFECTS_MULTIPLIER = 1.5;

class PotionFactory {

    createPotion(potionBlueprint, effects, sideEffects) {
        //Make the potion:
        return new Potion({ blueprint: potionBlueprint, effects, sideEffects });
    }
}

class Potion {
    static potionDescription;

    #name;
    #image;

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

    get level() {
        return this.effects.reduce((accumulatedLevel, effect) => {
            return (accumulatedLevel += effect.level);
        }, 0);
    }

    get name() {
        return (this.#name?
            this.#name :
            this.#name = this.generateName()
        );
    }

    generateName() {
        const template = parse(Potion.potionDescription.potion_name_scheme);

        //Get a random potion archetype:
        const potionArchetype = getRandom(
            Potion.potionDescription.potion_archetypes,
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

    get image() {
        return (this.#image ?
            this.#image :
            this.#image = this.generateImage()
        );
    }

    generateImage() {
        return getRandomFromArray(potionImages);
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
                return accumulatedValue + PotionEffect.effectsCost[level];
            }, 0
        ) * EFFECTS_MULTIPLIER**(this.effectLevels.length - 1);

        //Get modifier from Side Effects
        const modifier = this.sideEffectCategories.reduce(
            (accumulatedValue, category) => {
                return accumulatedValue * PotionSideEffect.sideEffectsCost[category];
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