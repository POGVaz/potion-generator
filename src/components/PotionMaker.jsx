import React, {useState} from "react";

import PotionViewer from "./PotionViewer";
import PotionMakerForm from "./PotionMakerForm";
import EffectTables from "./tables/EffectTables";
import { generatePotion } from "../GeneratePotion";

const PotionMaker = ({ effects, side_effects }) => {
  
  let potion = null;
  
  const [state, setState] = useState({ potion });

  const handleGenerate = (state) => {
    potion = generatePotion({
      ...state,
      possibleEffects: effects,
      possibleSideEffects: side_effects,
    });
    setState({ potion })
  };

  return (
    <div className="PotionMaker">

      <PotionMakerForm
        onSubmit = {handleGenerate}
      />

      <PotionViewer
        potion={state.potion}
      />

      <EffectTables
        effectsList={effects}
        sideEffectsList={side_effects}
      />
    </div>
  );
};

export default PotionMaker;
