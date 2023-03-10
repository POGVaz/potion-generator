'use-strict'

class PotionEffect {
    static effectsCost;

    constructor({id, level, name, description, component_constant_cost = 0, component_consumed_cost = 0}) {
        this.id = id;
        this.level = level;
        this.name = name;
        this.description = description;
        this.componentConstantCost = component_constant_cost;
        this.componentConsumedCost = component_consumed_cost;
    }
    
    get basePrice() {
        return (
            this.level?
                PotionEffect.effectsCost[this.level] + this.componentConsumedCost || (25 - 20 * this.level + this.level**2) :
                this.level
        );
    }

    toString() {
        return `Effect: ${this.id}`;
    }
}

class PotionSideEffect {
    static sideEffectsCost;

    constructor({ id, category, name, description, adjective, type = null, incompatible_with = [] }) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.name = name;
        this.description = description;
        this.adjective = adjective || name;
        this.incompatibleWith = incompatible_with;
    }

    get costModifier() {
        return (
            this.category?
                PotionSideEffect.sideEffectsCost[this.category] || 0.10 :
                0.10
        );
    }

    toString() {
        return `Side Effect: ${this.id}`;
    }
}

export { PotionEffect, PotionSideEffect };