import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

import { Item } from "../types";


type Props = {
  item: Item;
};

function ItemCard(props: Props) {
  return (
    <>
      <Grid item xs={3}>
        {/* <img src={imgSrc}></img> */}
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="280"
              image={props.item.imageUrl}
              alt="green iguana"
            />
            <CardContent>
              <Typography fontSize={"18px"}>{props.item.name}</Typography>
							<Typography fontSize={"16px"}>{props.item.price}円</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default ItemCard;
