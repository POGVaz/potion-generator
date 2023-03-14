import React from "react";
import PotionGalleryItem from "./PotionGalleryItem";

function PotionGallery({ potions, onSelect, onSave }) {
    
    const potionItems = potions? potions.map((potion) => {
      return (
        <div>
          <button
            className="potion-gallery-item"
            onClick={() => { onSelect(potion) }}
          >
            <PotionGalleryItem
              potion={potion}
              key={potion.name}
            />
          </button>
          <button
            onClick={() => { onSave(potion) }}
          >
            Save
          </button>
        </div>
      );
    }) : null;
    
    return (
      <div style={{ "textAlign": "center", "display": "flex"}}>
        {potionItems}
      </div>
    );
    
}

export default PotionGallery;
