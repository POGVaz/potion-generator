import React from "react";
import PotionGalleryItem from "./PotionGalleryItem";

class PotionGallery extends React.Component {

  render() {
    
    const potions = this.props.potions? this.props.potions.map((potion) => {
      return (
        <div>
          <button
            className="potion-gallery-item"
            onClick={() => { this.props.onSelect(potion) }}
          >
            <PotionGalleryItem
              potion={potion}
              key={potion.name}
            />
          </button>
          <button
            onClick={() => { this.props.onDelete(potion) }}
          >
            Delete
          </button>
        </div>
      );
    }) : null;
    
    return (
      <div style={{ "textAlign": "center", "display": "flex"}}>
        {potions}
      </div>
    );
    
  }
}

export default PotionGallery;
