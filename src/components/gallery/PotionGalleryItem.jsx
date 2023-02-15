import React from "react";
import MortarPestleAnimation from "../../assets/animations/mortar-pestle.mp4"

class PotionGalleryItem extends React.Component {

  renderEffect(effect) {
    return (
      <EffectViewer
        name = {effect.name}
      />
    )
  }

  render() {
    if (this.props.potion) {
      const effects = [
        ...this.props.potion.effects || [],
        ...this.props.potion.sideEffects || [],
      ].map((effect) => {
        return (
          <li key={effect.id}>
            {this.renderEffect(effect)}
          </li>
        );
      });
      
      return (
        <div style={{"textAlign": "center"}}>
          <h3 className="potion-name">
            {this.props.potion.name}
          </h3>
          <div className="potion-image">
            <img src={this.props.potion.image} alt="Potion Icon" width="100" height="100" />
          </div>
          <div className="potion-info">
            <b>Lv. {this.props.potion.level}</b> - {this.props.potion.value} 💰
          </div>
          <div className="potion-effects">
            <ul>
              {effects}
            </ul>
          </div>
        </div>
      );
    }
    else
      return (
        <div style={{ "textAlign": "center" }}>
          <video
            src={MortarPestleAnimation}
            alt="Mortar and Pestle idle animation"
            width="100" height="100"
            autoPlay muted loop
            >
              
          </video>
        </div>
      );
  }
}

function EffectViewer(props) {
  return (
    <div>
      <b>{props.name}</b>
    </div>
  );
}

export default PotionGalleryItem;
