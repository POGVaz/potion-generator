
import { Potion, PotionBlueprint } from "../Potion";
import { PotionEffect, PotionSideEffect } from "../PotionEffect";

describe('Model', () => {
  beforeAll(() => {
    PotionEffect.effectsCost = {
      "1": 100,
      "2": 300,
      "3": 400,
      "4": 600,
    }

    PotionSideEffect.sideEffectsCost = {
      "very_weak": 1,
      "weak": 0.75,
      "medium": 0.50,
      "strong": 0.25,
      "very_strong": 0.10,
    }
  });

  describe('Potion Blueprints', () => {
    describe('value', () => {
      it('Should have correct value for 1 effect', () => {
        expect(
          new PotionBlueprint({effectLevels: [1], sideEffectCategories: [],}).value
        ).toBe(100)
      });
  
      it('Should have correct value for 2 effects', () => {
        expect(
          new PotionBlueprint({effectLevels: [2,4], sideEffectCategories: [],}).value
        ).toBe(1350)
      });
  
      it('Should have correct value for 1 effect and 1 side effect', () => {
        expect(
          new PotionBlueprint({ effectLevels: [1], sideEffectCategories: ['weak'],}).value
        ).toBe(75)
      });
  
      it('Should have correct value for 2 effects and 1 side effect', () => {
        expect(
          new PotionBlueprint({ effectLevels: [1, 2], sideEffectCategories: ['medium'],}).value
        ).toBe(300)
      });
  
      it('Should have correct value for 1 effects and 2 side effect', () => {
        expect(
          new PotionBlueprint({ effectLevels: [1], sideEffectCategories: ['medium', 'very_strong'],}).value
        ).toBe(5)
      });
  
    });
  });
  
  describe('Potions', () => {
    describe('value', () => {
      it('Should have NaN for no blueprint', () => {
        expect(
          new Potion({}).value
        ).toBeNull();
      });

      it('Should have the same value as the passed blueprint rounded', () => {
        expect(
          new Potion({
            'blueprint': new PotionBlueprint({ effectLevels: [1, 2, 4], sideEffectCategories: ['strong', 'very_weak'], }),
          }).value
        ).toBe(563);
      });
    });

    describe('level', () => {
      it('Should have correct level for no effect', () => {
        expect(
          new Potion({}).value
        ).toBeNull();
      });

      it('Should have correct level for 1 effect', () => {
        expect(
          new Potion({effects: [new PotionEffect({level: 1})]}).level
        ).toBe(1);
      });

      it('Should have correct level for 2 effect', () => {
        expect(
          new Potion({ effects: [new PotionEffect({ level: 1 }), new PotionEffect({ level: 2 })]}).level
        ).toBe(3);
      });
    });

    describe('stringify', () => {
      it('Should return a string representing the potion', () => {
        expect(
          new Potion({
            blueprint: new PotionBlueprint({ effectLevels: [1], sideEffectCategories: ['medium', 'very_strong'] }),
            effects: [
              new PotionEffect({ id: 'effect_id_1', level: 1, name: 'effect_name_1', description: 'effect_description_1' }),
              new PotionEffect({ id: 'effect_id_2', level: 3, name: 'effect_name_2', description: 'effect_description_2' }),
            ],
            sideEffects: [
              new PotionSideEffect({id: 'side_effect_1', name: 'side_effect_name_1', category: 'medium'}),
              new PotionSideEffect({id: 'side_effect_2', name: 'side_effect_name_2', category: 'very_strong'}),
            ],
            name: "Test Potion",
            image: "Test Image",
            description: "Test Description",
          }).stringify()
        ).toBe("{\"effects\":[{\"id\":\"effect_id_1\",\"level\":1,\"name\":\"effect_name_1\",\"description\":\"effect_description_1\"},{\"id\":\"effect_id_2\",\"level\":3,\"name\":\"effect_name_2\",\"description\":\"effect_description_2\"}],\"sideEffects\":[{\"id\":\"side_effect_1\",\"category\":\"medium\",\"type\":null,\"name\":\"side_effect_name_1\",\"adjective\":\"side_effect_name_1\",\"incompatibleWith\":[]},{\"id\":\"side_effect_2\",\"category\":\"very_strong\",\"type\":null,\"name\":\"side_effect_name_2\",\"adjective\":\"side_effect_name_2\",\"incompatibleWith\":[]}],\"blueprint\":{\"effectLevels\":[1],\"sideEffectCategories\":[\"medium\",\"very_strong\"]},\"name\":\"Test Potion\",\"description\":\"Test Description\",\"image\":\"Test Image\"}");
      });
    });

    describe('parse', () => {
      it('Should create a new potion with the parsed string', () => {
        const testPotion = Potion.parse(JSON.parse("{\"effects\":[{\"id\":\"effect_id_1\",\"level\":1,\"name\":\"effect_name_1\",\"description\":\"effect_description_1\"},{\"id\":\"effect_id_2\",\"level\":3,\"name\":\"effect_name_2\",\"description\":\"effect_description_2\"}],\"sideEffects\":[{\"id\":\"side_effect_1\",\"category\":\"medium\",\"type\":null,\"name\":\"side_effect_name_1\",\"adjective\":\"side_effect_name_1\",\"incompatibleWith\":[]},{\"id\":\"side_effect_2\",\"category\":\"very_strong\",\"type\":null,\"name\":\"side_effect_name_2\",\"adjective\":\"side_effect_name_2\",\"incompatibleWith\":[]}],\"blueprint\":{\"effectLevels\":[1],\"sideEffectCategories\":[\"medium\",\"very_strong\"]},\"name\":\"Test Potion\",\"description\":\"Test Description\",\"image\":\"Test Image\"}"));

        expect(testPotion.name).toBe("Test Potion");
        expect(testPotion.image).toBe("Test Image");
        expect(testPotion.description).toBe("Test Description");
        expect(testPotion.level).toBe(4);
        expect(testPotion.value).toBe(5);
      });
    });
  });
})

