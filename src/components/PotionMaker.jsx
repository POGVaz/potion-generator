import React, { useRef, useState } from "react";

import PotionViewer from "./PotionViewer";
import PotionMakerForm from "./PotionMakerForm";
import EffectTables from "./tables/EffectTables";
import { generatePotion } from "../GeneratePotion";
import PotionGallery from "./gallery/PotionGallery";

const PotionMaker = ({ effects = [], side_effects = [] }) => {

  const [potion, setPotion] = useState( null );
  const [potions, setPotions] = useState( null );
  const [potionError, setPotionError] = useState( null );
  const effectsRef = useRef(effects);
  const sideEffectsRef = useRef(side_effects);

  const handleGenerate = (formData) => {
    try {
      const potions = [...new Array(5)].map(() => {
        return generatePotion({
          ...formData,
          possibleEffects: effectsRef.current,
          possibleSideEffects: sideEffectsRef.current,
          amount: 5,
        });
      });
      setPotions(potions);
      setPotion(potions[0]);
    }
    catch(error){
      setPotion( null );
      setPotions( [] );
      setPotionError(error.message);
      // throw error;
    }
  };

  const handleGalleryItemSelection = (selectedPotion) => {
    setPotion(selectedPotion);
  }

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
    <div className="PotionMaker">

      <PotionGallery
        potions={potions}
        onSelect={handleGalleryItemSelection}
      />

      <div style={{ "display": "flex" }}>
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
    </div>
  );
};

export default PotionMaker;
