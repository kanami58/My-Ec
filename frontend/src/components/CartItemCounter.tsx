import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { useRecoilCallback } from "recoil";

import { cartItemsSelector } from "../store";

type Props = {
  count: number;
  cartId: number;
};

function CartItemCounter(props: Props) {
  const refreshItems = useRecoilCallback(({ refresh }) => () => {
    refresh(cartItemsSelector);
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        disabled={props.count === 1}
        onClick={async () => {
          try {
            await fetch("http://localhost:3000/cart/count", {
              mode: "cors",
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartId: props.cartId,
                count: props.count - 1,
              }),
            });
            refreshItems();
          } catch {
            setOpen(true);
          }
        }}
      >
        <RemoveIcon />
      </IconButton>
      {props.count}
      <IconButton
        onClick={async () => {
          try {
            await fetch("http://localhost:3000/cart/count", {
              mode: "cors",
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartId: props.cartId,
                count: props.count + 1,
              }),
            });
            refreshItems();
          } catch {
            setOpen(true);
          }
        }}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        onClick={async () => {
          try {
            await fetch("http://localhost:3000/cart/delete", {
              mode: "cors",
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cartId: props.cartId }),
            });
            refreshItems();
          } catch {
            setOpen(true);
          }
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message="エラーが発生しました。商品数は変更できませんでした。"
      />
    </>
  );
}

export default CartItemCounter;
