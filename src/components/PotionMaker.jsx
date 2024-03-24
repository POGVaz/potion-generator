import React, { useRef, useState, useEffect } from "react";
import { Grid } from '@mui/material';

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
      const potions = [...new Array(6)].map(() => {
        return generatePotion({
          ...formData,
          possibleEffects: effectsRef.current,
          possibleSideEffects: sideEffectsRef.current,
          amount: 6,
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
    setSavedPotions([...savedPotions, potion.clone()]);
  }

  const handleSavedGalleryItemDelete = (potion) => {
    setSavedPotions(
      //Filter out the selected potion
      savedPotions.filter((savedPotion) => {
        return (savedPotion !== potion);
      })
    )
  }

  const handleDeleteAllSavedItems = () => {
    setSavedPotions([]);
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

      <PotionMakerForm
        onSubmit={handleGenerate}
      />

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
        onDeleteAll={handleDeleteAllSavedItems}
      />

      <Grid container spacing={2}>

        <Grid item sm={3}>
          <PotionViewer
            potion={potionToDisplay}
            error={potionError}
          />
        </Grid>

        <Grid item sm={9}>
          <EffectTables
            effectsList={effects}
            sideEffectsList={side_effects}
            onEffectsChange={handleEffectsSelectionChange}
            onSideEffectsChange={handleSideEffectsSelectionChange}
          />
        </Grid>

      </Grid>
    </div>
  );
};

export default PotionMaker;
