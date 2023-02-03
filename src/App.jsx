import './App.css';
import {build} from './builder/DataBuilder';

import { Potion } from './model/Potion';
import { PotionEffect, PotionSideEffect } from './model/PotionEffect';
import PotionMaker from './components/PotionMaker';

function App() {
  const { effects, side_effects, effects_cost, side_effects_cost, potion_descriptions } = build();

  PotionEffect.effectsCost = effects_cost;
  PotionSideEffect.sideEffectsCost = side_effects_cost;
  Potion.potionDescription = potion_descriptions;

  return (
    <div className="App">
      <PotionMaker
        effects = {effects}
        side_effects = {side_effects}
      />
    </div>
  );
}

export default App;
