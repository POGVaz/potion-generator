import './App.css';
import { Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import {build} from './builder/DataBuilder';

import DarkModeSwitch from './components/DarkModeSwitch';
import { Potion } from './model/Potion';
import { PotionEffect, PotionSideEffect } from './model/PotionEffect';
import PotionMaker from './components/PotionMaker';

function App() {
  const { effects, side_effects, effects_cost, side_effects_cost, potion_descriptions } = build();

  PotionEffect.effectsCost = effects_cost;
  PotionSideEffect.sideEffectsCost = side_effects_cost;
  Potion.potionDescription = potion_descriptions;

  const [darkMode, setDarkMode] = useState(false);
  const myTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Toolbar variant="dense">
          <DarkModeSwitch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            aria-label="dark mode switch"
          />

        </Toolbar>

        <PotionMaker
          effects = {effects}
          side_effects = {side_effects}
        />

        <footer>
          medium magic potion by Fritz Duggan from <a href="https://thenounproject.com/browse/icons/term/medium-magic-potion/" target="_blank" rel="noreferrer" title="medium magic potion Icons">Noun Project</a>
        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
