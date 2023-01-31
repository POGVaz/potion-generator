import './App.css';
import {build} from './builder/DataBuilder';
import EffectTables from './components/tables/EffectTables';

import { generatePotion } from './GeneratePotion';
import { Potion } from './model/Potion';
import { PotionEffect, PotionSideEffect } from './model/PotionEffect';

function App() {
  const { effects, side_effects, effects_cost, side_effects_cost, potion_descriptions } = build();

  PotionEffect.effectsCost = effects_cost;
  PotionSideEffect.sideEffectsCost = side_effects_cost;
  Potion.potionDescription = potion_descriptions;

  for (let index = 0; index < 10; index++) {
    try {
      let potion = generatePotion({
        minEffects: 1,
        maxEffects: 2,
        minSideEffects: 1,
        maxSideEffects: 2,
        possibleEffects: [effects[0]],
        possibleSideEffects: [side_effects[0], side_effects[1]],
      });
      console.log(potion.name, ' - ', potion.value);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  return (
    <div className="App">
      <EffectTables 
        effectsList={effects}
        sideEffectsList={side_effects}
      />
    </div>
  );
}

export default App;
