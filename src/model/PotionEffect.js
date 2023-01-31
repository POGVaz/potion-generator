'use-strict'

import effects_cost from "../data/potion_effects_cost.json";
import side_effects_modifier from "../data/potion_side_effects_modifier.json";

class PotionEffect {
    static effectsCost;

    constructor({id, level, name, description}) {
        this.id = id;
        this.level = level;
        this.name = name;
        this.description = description;
    }
    
    get basePrice() {
        return (
            this.level?
                effects_cost[this.level] || (25 - 20 * this.level + this.level**2) :
                this.level
        );
    }

    toString() {
        return `Effect: ${this.id}`;
    }
}

class PotionSideEffect {
    static sideEffectsCost;

    constructor({ id, category, name, description, adjective }) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.adjective = adjective || name;
    }

    get costModifier() {
        return (
            this.category?
                side_effects_modifier[this.category] || 0.10 :
                0.10
        );
    }

    toString() {
        return `Side Effect: ${this.id}`;
    }
}

export { PotionEffect, PotionSideEffect };