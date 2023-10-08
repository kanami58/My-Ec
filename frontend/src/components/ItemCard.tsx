import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Item } from "../types";

type Props = {
  item: Item;
};

function ItemCard(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClickHandler = () => {
      console.log(props.item.name + "がクリックされました");
      navigate(`/item?id=${props.item.id}`);
    };
    ref.current?.addEventListener("click", onClickHandler);

    const elm = ref.current;
    return () => {
      // returnに渡したコールバック関数はコンポーネントのアンマウント時に実行される
      elm?.removeEventListener("click", onClickHandler);
    };
  }, []);
  return (
    <>
      <Grid item xs={3}>
        {/* <img src={imgSrc}></img> */}
        <Card sx={{ maxWidth: 345 }} ref={ref}>
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
