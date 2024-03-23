import React from "react";
import { Card, CardActions, Button, CardActionArea, CardMedia, CardContent, Typography, CardHeader, Link, Tooltip } from "@mui/material"

function PotionGalleryItem({ potion, canSave=false, canDelete=false, onSelect, onSave, onDelete }) {
  
  const effects = [
    ...potion.effects || [],
    ...potion.sideEffects || [],
  ].map((effect) => {
    return (
      <EffectViewer
        name={effect.name}
        reference={effect.reference}
        description={effect.description}
      />
    );
  });
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onSelect}>
        <CardHeader
          titleTypographyProps={{ variant:"h6", }}
          title={potion.name}
          subheader={"Lv." + potion.level + "-" + potion.value + "💰"}
        />
        <CardMedia
          component="img"
          height={100}
          image={potion.image}
          alt="Potion Icon"
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography variant="body1">
              {effects}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {canSave &&
          <Button size="small" color="primary" onClick={onSave}>
            Save
          </Button>
        }
        {canDelete &&
          <Button size="small" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      </CardActions>
    </Card>
  );
}

function EffectViewer({ reference, name, description }) {
  return (
    <Tooltip title={description} placement="right">
        {(reference)?
          <Link href={reference}><Typography>{name}</Typography></Link> :
          <Typography>{name}</Typography>}
      </Tooltip>
  );
}

export default PotionGalleryItem;
