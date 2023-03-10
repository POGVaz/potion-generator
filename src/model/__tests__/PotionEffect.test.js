import { PotionEffect, PotionSideEffect } from "../PotionEffect";


beforeAll(() => {
  PotionEffect.effectsCost = {
    "1": 100,
    "2": 200,
    "3": 300,
    "4": 400,
  }

  PotionSideEffect.sideEffectsCost = {
    "very_weak": 1,
    "weak": 0.75,
    "medium": 0.50,
    "strong": 0.25,
    "very_strong": 0.10,
  }
});

describe('Potion Effect', () => {
  describe('basePrice', () => {
    it('Should have correct basePrice for simple effect', () => {
      expect(
        new PotionEffect({ id: "effect_id_1", name: "effect_name_1", level: 2, description: "effect_description_1"}).basePrice
      ).toBe(200)
    });

    it('Should have correct basePrice effect and componentConsumedCost', () => {
      expect(
        new PotionEffect({ id: "effect_id_2", name: "effect_name_2", level: 3, description: "effect_description_2", component_consumed_cost: 50 }).basePrice
      ).toBe(350)
    });
  });

  describe('toString', () => {
    it('Should correctly return a readable string', () => {
       expect(
         new PotionEffect({ id: "effect_id_1", name: "effect_name_1", level: 2, description: "effect_description_1" }).toString()
       ).toBe('Effect: effect_id_1');
    });
  });
});

describe('Potion Side Effect', () => {
  describe('costModifier', () => {
    it('Should have correct costModifier', () => {
      expect(
        new PotionSideEffect({ id: "side_effect_id_1", category: "weak", adjective: "effect_adjective_1", description: "effect_description_1"}).costModifier
      ).toBe(0.75)
    });
  });

  describe('toString', () => {
    it('Should correctly return a readable string', () => {
       expect(
         new PotionSideEffect({ id: "side_effect_id_1", category: "weak", adjective: "effect_adjective_1", description: "effect_description_1" }).toString()
       ).toBe('Side Effect: side_effect_id_1');
    });
  });
});
