import './App.css';
import {build} from './builder/DataBuilder';
import EffectTables from './components/tables/EffectTables';

import { generatePotion } from './GeneratePotion';

function App() {
  const { effects, side_effects } = build();

  for (let index = 0; index < 10; index++) {
    let potion = generatePotion({
      minEffects: 2,
      maxEffects: 2,
      minSideEffects: 2,
      maxSideEffects: 2,
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
