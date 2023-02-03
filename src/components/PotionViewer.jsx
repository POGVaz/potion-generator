import React from "react";

class PotionViewer extends React.Component {

  renderEffect(effect) {
    return (
      <EffectViewer
        name = {effect.name}
        description = {effect.description}
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
            <img src={this.props.potion.image} alt="Potion Icon" width="200" height="200" />
          </div>
          <div className="potion-level">
            Level: {this.props.potion.level}
          </div>
          <div className="potion-price">
            Price: {this.props.potion.value} 💰
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
      return ;
  
  }

}

function EffectViewer(props) {
  return (
    <div>
      <b>{props.name}: </b> {props.description}
    </div>
  );
}

export default PotionViewer;