import React from "react";
import PotionGalleryItem from "./PotionGalleryItem";
import { Grid, Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PotionGallery({ potions, onSelect, onSave }) {
    
  const potionItems = potions? potions.map((potion) => {
    return (
      <Grid item sm={2} >
        <PotionGalleryItem
          key={potion.name}
          potion={potion}
          onSelect={() => onSelect(potion)}
          canSave={true}
          onSave={() => onSave(potion)}
          canDelete={false}
        />
      </Grid>
    );
  }) : null;
  
  return (
    <Accordion defaultExpanded variant="dense" >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Generated Potions
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {potionItems}
          </Grid>
        </AccordionDetails>
      </Accordion>
  );
    
}

export default PotionGallery;
