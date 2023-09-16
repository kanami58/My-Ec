import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

import itemImage1 from "../assets/furo_ducky.png";
import itemImage2 from "../assets/omocha_mokuba.png";
import itemImage3 from "../assets/omocha_tsumiki.png";
import { Item } from "../types";

const itemList: Item[] = [
  { id: 1, name: "あひる", price: 500, imageUrl: itemImage1 },
  { id: 2, name: "うま", price: 600, imageUrl: itemImage2 },
  { id: 3, name: "つみき", price: 700, imageUrl: itemImage3 },
];

type Props = {
  itemId: number;
};

function ItemCard(props: Props) {
  const itemListIndex = props.itemId % 3;
  const item = itemList[itemListIndex];
  return (
    <>
      <Grid item xs={3}>
        {/* <img src={imgSrc}></img> */}
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="280"
              image={item.imageUrl}
              alt="green iguana"
            />
            <CardContent>
              <Typography fontSize={"18px"}>{item.name}</Typography>
							<Typography fontSize={"16px"}>{item.price}円</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default ItemCard;
