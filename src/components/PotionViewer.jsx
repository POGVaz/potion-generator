import React from "react";
import MortarPestleAnimation from "../assets/animations/mortar-pestle.mp4"

function PotionViewer({ potion, error }) {
  if (potion) {
    const effects = [
      ...potion.effects || [],
      ...potion.sideEffects || [],
    ].map((effect) => {
      return (
        <li key={effect.id}>
          <EffectViewer effect={effect} />
        </li>
      );
    });

    return (
      <div style={{"textAlign": "center"}}>
        <h3 className="potion-name">
          {potion.name}
        </h3>
        <div className="potion-image">
          <img src={potion.image} alt="Potion Icon" width="200" height="200" />
        </div>
        <div className="potion-level">
          Level: {potion.level}
        </div>
        <div className="potion-price">
          Price: {potion.value} 💰
        </div>

        <div className="potion-constant-price" style={{ display: potion.componentConstantCost > 0 ? "block" : "none" }}>
          Static Components: {potion.componentConstantCost} 💰
        </div>

        <div className="potion-effects">
          <ul>
            {effects}
          </ul>
        </div>
        <div className="potion-description">
          {potion.description}
        </div>
      </div>
    );
  }
  else
    return (
      <div style={{ "textAlign": "center" }}>
        <p style={{ "color": "red" }}>{error}</p>
        <video
          src={MortarPestleAnimation}
          alt="Mortar and Pestle idle animation"
          width="300" height="300"
          autoPlay muted loop
        >
        </video>
      </div>
    );
}

function EffectViewer({ reference, name, description }) {
  return (
    <div>
      <b><a href={reference} target="_blank" rel="noreferrer">{name}</a>: </b> {description}
    </div>
  );
}

export default PotionViewer;
