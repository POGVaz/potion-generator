import './App.css';
import {build} from './builder/DataBuilder';
import EffectTables from './components/tables/EffectTables';

function App() {
  const { effects, side_effects } = build();

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
