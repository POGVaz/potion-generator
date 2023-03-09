import React, { useRef, useState, useEffect } from "react";

import PotionViewer from "./PotionViewer";
import PotionMakerForm from "./PotionMakerForm";
import EffectTables from "./tables/EffectTables";
import { generatePotion } from "../functions/GeneratePotion";
import PotionGallery from "./gallery/PotionGallery";
import PotionSavedGallery from "./gallery/PotionSavedGallery";

import { loadPotionsFromStorage } from "../builder/LoadDataFromStorage";

const PotionMaker = ({ effects = [], side_effects = [] }) => {

  const [potionToDisplay, setPotionToDisplay] = useState( null );
  const [generatedPotions, setGeneratedPotions] = useState( null );
  const [savedPotions, setSavedPotions] = useState(loadPotionsFromStorage("savedPotions") );
  const [potionError, setPotionError] = useState( null );
  
  const effectsRef = useRef(effects);
  const sideEffectsRef = useRef(side_effects);

  //On change, save the saved potions on local storage
  useEffect(() => {
    localStorage.setItem('savedPotions', savedPotions ? "["+savedPotions.map((savedPotion) => savedPotion.stringify())+"]" : []);
  }, [savedPotions]);

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
      setGeneratedPotions(potions);
      setPotionToDisplay(potions[0]);
    }
    catch(error){
      setPotionToDisplay( null );
      setGeneratedPotions( [] );
      setPotionError(error.message);
      // throw error;
    }
  };

  const handleGalleryItemSelection = (potion) => {
    setPotionToDisplay(potion);
  }

  const handleGalleryItemSave = (potion) => {
    setSavedPotions([...savedPotions, potion]);
  }

  const handleSavedGalleryItemDelete = (potion) => {
    setSavedPotions(
      //Filter out the selected potion
      savedPotions.filter((savedPotion) => {
        return (savedPotion !== potion);
      })
    )
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
        className="generated-potions"
        potions={generatedPotions}
        onSelect={handleGalleryItemSelection}
        onSave={handleGalleryItemSave}
      />

      <PotionSavedGallery
        className="saved-potions"
        potions={savedPotions}
        onSelect={handleGalleryItemSelection}
        onDelete={handleSavedGalleryItemDelete}
      />

      <div style={{ "display": "flex" }}>
        <div>
          <PotionViewer
            potion={potionToDisplay}
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
