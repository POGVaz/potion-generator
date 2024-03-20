
import { PotionEffect, PotionSideEffect } from "../../model/PotionEffect";
import { getLevelArrayFromEffects, getCategoryArrayFromSideEffects, generateBlueprints, selectRandomEffects, selectRandomSideEffects, } from "../GeneratePotion";
import { PotionBlueprint } from '../../model/Potion';

describe('getLevelArrayFromEffects', () => {
  it('Should return an empty array if provided an empty array', () => {
    const inputArray = [];
    const expectedOutput = [];
    expect(getLevelArrayFromEffects(inputArray)).toEqual(expectedOutput);
  });

  it('Should return a single item array if provided a single item array', () => {
    const inputArray = [new PotionEffect({ level: 2 })];
    const expectedOutput = [2];
    expect(getLevelArrayFromEffects(inputArray)).toEqual(expectedOutput);
  });

  it('Should return an array of levels from an array of effects', () => {
    const inputArray = [
      new PotionEffect({level: 1}),
      new PotionEffect({level: 2}),
      new PotionEffect({level: 3}),
      new PotionEffect({level: 4}),
    ];
    const expectedOutput = [
      1,2,3,4,
    ];
    expect(getLevelArrayFromEffects(inputArray)).toEqual(expectedOutput);
  });
});

describe('getCategoryArrayFromSideEffects', () => {
  it('Should return an empty array if provided an empty array', () => {
    const inputArray = [];
    const expectedOutput = [];
    expect(getCategoryArrayFromSideEffects(inputArray)).toEqual(expectedOutput);
  });

  it('Should return a single item array if provided a single item array', () => {
    const inputArray = [new PotionSideEffect({ category: 'weak' })];
    const expectedOutput = ['weak'];
    expect(getCategoryArrayFromSideEffects(inputArray)).toEqual(expectedOutput);
  });

  it('Should return an array of levels from an array of effects', () => {
    const inputArray = [
      new PotionSideEffect({ category: 'very_weak' }),
      new PotionSideEffect({ category: 'weak' }),
      new PotionSideEffect({ category: 'strong' }),
      new PotionSideEffect({ category: 'very_strong' }),
    ];
    const expectedOutput = [
      'very_weak','weak','strong','very_strong',
    ];
    expect(getCategoryArrayFromSideEffects(inputArray)).toEqual(expectedOutput);
  });
});

describe("generateBlueprints", () => {
  it("Should return an empty array when either argument is empty", () => {
    const result1 = generateBlueprints([], [["poison"]]);
    const result2 = generateBlueprints([[1, 2], [1]], []);

    expect(result1).toEqual([]);
    expect(result2).toEqual([]);
  });

  it("Should return an array of potion blueprints when given valid arguments", () => {
    const levelsCombinations = [[1, 2], [1]];
    const categoriesCombinations = [["weak"], ["very_weak", "strong"]];

    const expectedResult = [
      new PotionBlueprint({effectLevels: [1, 2], sideEffectCategories: ['weak']}),
      new PotionBlueprint({ effectLevels: [1, 2], sideEffectCategories: ["very_weak", "strong"] }),
      new PotionBlueprint({effectLevels: [1], sideEffectCategories: ['weak']}),
      new PotionBlueprint({ effectLevels: [1], sideEffectCategories: ["very_weak", "strong"] }),
    ];

    expect(generateBlueprints(levelsCombinations, categoriesCombinations)).toEqual(expectedResult);
  });

  it("Should return an array of potion blueprints when given only levels combinations", () => {
    const levelsCombinations = [[1, 2], [1], [2, 3]];
    const categoriesCombinations = [[]];

    const expectedResult = [
      new PotionBlueprint({effectLevels: [1, 2], sideEffectCategories: []}),
      new PotionBlueprint({ effectLevels: [1], sideEffectCategories: []}),
      new PotionBlueprint({effectLevels: [2,3], sideEffectCategories: []}),
    ];

    expect(generateBlueprints(levelsCombinations, categoriesCombinations)).toEqual(expectedResult);
  });
});

describe("selectRandomEffects", () => {
  const possibleEffects = [
    { id: "1", level: 1 },
    { id: "2", level: 1 },
    { id: "3", level: 2 },
    { id: "4", level: 2 },
    { id: "5", level: 3 },
    { id: "6", level: 3 },
  ];

  const possibleSideEffects = [
    { id: "se1", incompatibleWith: ["1"] },
    { id: "se2", incompatibleWith: [] },
    { id: "se3", incompatibleWith: ["2", "4"] },
  ];

  const potionBlueprint = {
    effectLevels: [1, 2, 3],
    sideEffectCategories: ["a", "b", "c"],
  };

  it("Should return an array of the same length as the effectLevels array in the potion blueprint", () => {
    const effects = selectRandomEffects(
      potionBlueprint,
      possibleEffects,
      possibleSideEffects
    );

    expect(effects.length).toBe(potionBlueprint.effectLevels.length);
  });

  it("Should return an array of effect objects that have the correct level", () => {
    const effects = selectRandomEffects(
      potionBlueprint,
      possibleEffects,
      possibleSideEffects
    );

    effects.forEach((effect) => {
      expect(effect.level).toBe(
        potionBlueprint.effectLevels[effects.indexOf(effect)]
      );
    });
  });

  it("Should return an array of effect objects that have not been used before", () => {
    const effects = selectRandomEffects(
      potionBlueprint,
      possibleEffects,
      possibleSideEffects
    );

    const uniqueEffectIds = new Set(effects.map((effect) => effect.id));
    expect(uniqueEffectIds.size).toBe(effects.length);
  });

  it("Should throw an error if there are no valid effects that satisfy the conditions", () => {
    expect(() =>
      selectRandomEffects(
        { effectLevels: [4], sideEffectCategories: [] },
        possibleEffects,
        possibleSideEffects
      )
    ).toThrow("No valid effects");
  });
});

describe('selectRandomSideEffects', () => {
  const possibleSideEffects = [
    { id: "se1", category:"a", incompatibleWith: [1] },
    { id: "se2", category:"a", incompatibleWith: [2] },
    { id: "se3", category:"a", incompatibleWith: [3] },
    { id: "se4", category:"a", incompatibleWith: [] },
    { id: "se5", category:"b", incompatibleWith: [] },
    { id: "se6", category:"c", incompatibleWith: [] },
  ];

  const potionBlueprint = {
    effectLevels: [1, 2, 3],
    sideEffectCategories: ["a", "b", "c"],
  };

  const usedEffects = [
    { id: "1", level: 1 },
    { id: "2", level: 2 },
  ];

  it("Should return an array of the same length as the sideEffectCategories array in the potion blueprint", () => {
    const sideEffects = selectRandomSideEffects(
      potionBlueprint,
      possibleSideEffects,
      usedEffects
    );

    expect(sideEffects.length).toBe(potionBlueprint.sideEffectCategories.length);
  });

  it("Should return an array of side effect objects that have the correct category", () => {
    const sideEffects = selectRandomSideEffects(
      potionBlueprint,
      possibleSideEffects,
      usedEffects
    );

    sideEffects.forEach((sideEffect) => {
      expect(sideEffect.category).toBe(
        potionBlueprint.sideEffectCategories[sideEffects.indexOf(sideEffect)]
      );
    });
  });

  it("Should return an array of effect objects that have not been used before", () => {
    const sideEffects = selectRandomSideEffects(
      potionBlueprint,
      possibleSideEffects,
      usedEffects
    );

    const uniqueEffectIds = new Set(sideEffects.map((effect) => effect.id));
    expect(uniqueEffectIds.size).toBe(sideEffects.length);
  });

  it("Should throw an error if there are no valid effects that satisfy the conditions", () => {
    expect(() =>
      selectRandomSideEffects(
        { effectLevels: [1], sideEffectCategories: ["d"] },
        possibleSideEffects,
        usedEffects
      )
    ).toThrow("No valid side effects");
  });

  it('Should not select side effects incompatible with used effects', () => {
    const sideEffects = selectRandomSideEffects(
      potionBlueprint,
      possibleSideEffects,
      usedEffects
    );

    expect(sideEffects[0].id).toBe('se4');
    expect(sideEffects[1].id).toBe('se5');
    expect(sideEffects[2].id).toBe('se6');
  });
});