import React from "react";

function PotionGalleryItem({ potion }) {
  
  const effects = [
    ...potion.effects || [],
    ...potion.sideEffects || [],
  ].map((effect) => {
    return (
      <li key={effect.id}>
        <EffectViewer
          name={effect.name}
          reference={effect.reference}
        />
      </li>
    );
  });
  
  return (
    <div style={{"textAlign": "center"}}>
      <h3 className="potion-name">
        {potion.name}
      </h3>
      <div className="potion-image">
        <img src={potion.image} alt="Potion Icon" width="100" height="100" />
      </div>
      <div className="potion-info">
        <b>Lv. {potion.level}</b> - {potion.value} 💰
      </div>
      <div className="potion-effects">
        <ul>
          {effects}
        </ul>
      </div>
    </div>
  );
}

function EffectViewer({ reference, name }) {
  return (
    <div>
      <b><a href={reference} target="_blank" rel="noreferrer">{name}</a></b>
    </div>
  );
}

export default PotionGalleryItem;
