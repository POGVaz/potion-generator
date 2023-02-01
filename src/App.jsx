import './App.css';
import {build} from './builder/DataBuilder';
import PotionViewer from './components/PotionViewer';
import EffectTables from './components/tables/EffectTables';

import { generatePotion } from './GeneratePotion';
import { Potion } from './model/Potion';
import { PotionEffect, PotionSideEffect } from './model/PotionEffect';

function App() {
  const { effects, side_effects, effects_cost, side_effects_cost, potion_descriptions } = build();

  PotionEffect.effectsCost = effects_cost;
  PotionSideEffect.sideEffectsCost = side_effects_cost;
  Potion.potionDescription = potion_descriptions;

  const potions = [];
  for (let index = 0; index < 10; index++) {
    try {
      let potion = generatePotion({
        minEffects: 1,
        maxEffects: 1,
        minSideEffects: 1,
        maxSideEffects: 2,
        possibleEffects: effects,
        possibleSideEffects: side_effects,
      });
      potions.push(potion);
      console.log(potion.name, ' - ', potion.value);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  return (
    <div className="App">

      <PotionViewer
        potion={potions[0]}
      />

      <EffectTables 
        effectsList={effects}
        sideEffectsList={side_effects}
      />
    </div>
  );
}

export default App;
