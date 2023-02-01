'use-strict'

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
                PotionEffect.effectsCost[this.level] || (25 - 20 * this.level + this.level**2) :
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