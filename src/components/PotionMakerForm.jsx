import React, {useState} from "react";

const initialValues = {
  minPrice: 0,
  maxPrice: 1000,
  minEffects: 1,
  maxEffects: 1,
  minSideEffects: 0,
  maxSideEffects: 2,
}

const PotionMakerForm = ({ onSubmit }) => {
  const [state, setState] = useState(initialValues);

  const handleChange = e => {
    let { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(state);
  };

  return (
    <div>
      <label htmlFor="price">Price</label>
      <div id="priceInput">
        <label htmlFor="minPrice">Min</label>
        <input
          id="minPrice"
          name="minPrice"
          type="number"
          min="0"
          max="999999"
          placeholder="0"
          value={state.minPrice}
          onChange={handleChange}
        />
        <span> - </span>
        <label htmlFor="maxPrice">Max</label>
        <input
          id="maxPrice"
          name="maxPrice"
          type="number"
          min="0"
          max="999999"
          placeholder="100"
          value={state.maxPrice}
          onChange={handleChange}
        />
        <span> 💰</span>
      </div>

      <label htmlFor="effects">Potion Effects</label>
      <div id="effectsInput">
        <label htmlFor="minEffects">Min</label>
        <input
          id="minEffects"
          name="minEffects"
          type="number"
          min="0"
          max="10"
          placeholder="1"
          value={state.minEffects}
          onChange={handleChange}
        />
        <span> - </span>
        <label htmlFor="maxEffects">Max</label>
        <input
          id="maxEffects"
          name="maxEffects"
          type="number"
          min="0"
          max="10"
          placeholder="1"
          value={state.maxEffects}
          onChange={handleChange}
        />
      </div>

      <label htmlFor="sideEffects">Potion Side Effects</label>
      <div id="sideEffectsInput">
        <label htmlFor="minSideEffects">Min</label>
        <input
          id="minSideEffects"
          name="minSideEffects"
          type="number"
          min="0"
          max="10"
          placeholder="1"
          value={state.minSideEffects}
          onChange={handleChange}
        />
        <span> - </span>
        <label htmlFor="maxSideEffects">Max</label>
        <input
          id="maxSideEffects"
          name="maxSideEffects"
          type="number"
          min="0"
          max="10"
          placeholder="1"
          value={state.maxSideEffects}
          onChange={handleChange}
        />
      </div>


      <div className="center">
        <button
          id="generate-potion-btn"
          className="generate-btn"
          type="button"
          onClick={handleSubmit}
        >
          Generate Potion
        </button>
      </div>
    </div>
  );
};

export default PotionMakerForm;
