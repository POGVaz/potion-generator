import React from "react";
import PotionGalleryItem from "./PotionGalleryItem";
import { Button,  Grid, Accordion,  AccordionSummary,  AccordionDetails,  AccordionActions, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PotionGallery({ potions, onSelect, onDelete, onDeleteAll }) {

  const potionItems = potions? potions.map((potion) => {
    return (
      <Grid item sm={2}>
        <PotionGalleryItem
          key={potion.name}
          potion={potion}
          onSelect={() => onSelect(potion)}
          canSave={false}
          onDelete={() => onDelete(potion)}
          canDelete={true}
        />
      </Grid>
    );
  }) : null;
  
  return (
    <Accordion defaultExpanded variant="dense" >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Saved Potions Gallery
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {potionItems}
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button onClick={() => { onDeleteAll() }}>Delete all</Button>
        </AccordionActions>
      </Accordion>
  );
}

export default PotionGallery;
