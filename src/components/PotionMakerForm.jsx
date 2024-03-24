import React, {useState} from "react";
import { Button, Slider, Grid, Input, Typography } from "@mui/material"

const initialValues = {
  minPrice: 0,
  maxPrice: 1000,
  minEffects: 1,
  maxEffects: 1,
  minSideEffects: 0,
  maxSideEffects: 1,
}

const PotionMakerForm = ({ onSubmit }) => {
  const [price, setPrice] = useState([initialValues.minPrice, initialValues.maxPrice]);
  const [effects, setEffects] = useState([initialValues.minEffects, initialValues.maxEffects]);
  const [sideEffects, setSideEffects] = useState([initialValues.minSideEffects, initialValues.maxSideEffects]);

  const handleSubmit = () => {
    onSubmit({
      minPrice: price[0],
      maxPrice: price[1],
      minEffects: effects[0],
      maxEffects: effects[1],
      minSideEffects: sideEffects[0],
      maxSideEffects: sideEffects[1],
    });
  };

  return (
    // <Box sx={{ width: 500 }}>

      <Grid container spacing={6}>
        <Grid container item sm={4} spacing={2} alignItems="center">
          <Grid item >
            <Typography gutterBottom>
              Price:
            </Typography>
          </Grid>
          <Grid item>
            <Input
              value={price[0]}
              size="small"
              onChange={(event) => { setPrice([Number(event.target.value), price[1]]) }}
              inputProps={{
                step: 10,
                min: 0,
                max: 9999,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          <Grid item xs>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={price}
              onChange={(event, newValue) => { setPrice(newValue) }}
              valueLabelDisplay="auto"
              min={1}
              max={10000}
            />
          </Grid>
          <Grid item>
            <Input
              value={price[1]}
              size="small"
              onChange={(event) => { setPrice([price[0], Number(event.target.value)]) }}
              inputProps={{
                step: 10,
                min: 0,
                max: 10000,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>

        <Grid container item sm={3} spacing={2} alignItems="center">
          <Grid item >
            <Typography gutterBottom>
              Effects
            </Typography>
          </Grid>
          <Grid item>
            <Input
              value={effects[0]}
              size="small"
              onChange={(event) => { setEffects([Number(event.target.value), effects[1]]) }}
              inputProps={{
                step: 1,
                min: 0,
                max: 5,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          <Grid item xs>
            <Slider
              getAriaLabel={() => 'effects range'}
              value={effects}
              onChange={(event, newValue) => { setEffects(newValue) }}
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </Grid>
          <Grid item>
            <Input
              value={effects[1]}
              size="small"
              onChange={(event) => { setEffects([effects[0], Number(event.target.value)]) }}
              inputProps={{
                step: 1,
                min: 1,
                max: 5,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>

        <Grid container item sm={3} spacing={2} alignItems="center">
          <Grid item >
            <Typography gutterBottom>
              Side Effects
            </Typography>
          </Grid>
          <Grid item>
            <Input
              value={sideEffects[0]}
              size="small"
              onChange={(event) => { setSideEffects([Number(event.target.value), sideEffects[1]]) }}
              inputProps={{
                step: 1,
                min: 0,
                max: 5,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          <Grid item xs>
            <Slider
              getAriaLabel={() => 'sideEffects range'}
              value={sideEffects}
              onChange={(event, newValue) => { setSideEffects(newValue) }}
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </Grid>
          <Grid item>
            <Input
              value={sideEffects[1]}
              size="small"
              onChange={(event) => { setSideEffects([sideEffects[0], Number(event.target.value)]) }}
              inputProps={{
                step: 1,
                min: 1,
                max: 5,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Button variant="contained" onClick={handleSubmit}>Generate Potions</Button>
        </Grid>

      </Grid>
    
  );
};

export default PotionMakerForm;
