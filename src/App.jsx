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
    let potion = generatePotion({
      minEffects: 1,
      maxEffects: 1,
      minSideEffects: 1,
      maxSideEffects: 1,
      possibleEffects: [effects[1], effects[2]],
      possibleSideEffects: side_effects,
    });
    console.log(potion.name, ' - ', potion.value);
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
