import React, { useRef, useState } from "react";

import PotionViewer from "./PotionViewer";
import PotionMakerForm from "./PotionMakerForm";
import EffectTables from "./tables/EffectTables";
import { generatePotion } from "../GeneratePotion";

const PotionMaker = ({ effects = [], side_effects = [] }) => {

  const [potion, setPotion] = useState( null );
  const [potionError, setPotionError] = useState( null );
  const effectsRef = useRef(effects);
  const sideEffectsRef = useRef(side_effects);

  const handleGenerate = (formData) => {
    try {
      const potion = generatePotion({
        ...formData,
        possibleEffects: effectsRef.current,
        possibleSideEffects: sideEffectsRef.current,
      });
      setPotion( potion );
    }
    catch(error){
      setPotion( null );
      setPotionError(error.message);
      // throw error;
    }
  };


  const handleEffectsSelectionChange = (effectRows) => {
      effectsRef.current = effectRows.map((rowData) => {
        return rowData.original;
      });;
  };

  const handleSideEffectsSelectionChange = (sideEffectRows) => {
    sideEffectsRef.current = sideEffectRows.map((rowData) => {
      return rowData.original;
    });
  }

  return (
    <div className="PotionMaker" style={{ "display": "flex" }}>

      <div>
        <PotionViewer
          potion={potion}
          error={potionError}
        />

        <PotionMakerForm
          onSubmit = {handleGenerate}
        />
      </div>

      <EffectTables
        effectsList={effects}
        sideEffectsList={side_effects}
        onEffectsChange={handleEffectsSelectionChange}
        onSideEffectsChange={handleSideEffectsSelectionChange}
      />
    </div>
  );
};

export default PotionMaker;
