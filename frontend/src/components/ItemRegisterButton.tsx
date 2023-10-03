import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback } from "recoil";

import { allItemsSelector } from "../store";

type Props = {
  name: string;
  price: number;
  imageUrl: string;
};

function ItemRegisterButton(props: Props) {

  const refreshItems = useRecoilCallback(({ refresh }) => () => {
    refresh(allItemsSelector);
  });

  const navigate = useNavigate();
  const onClickHandler = async () => {
    try {
      await fetch("http://localhost:3000/items", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
      });
      navigate("/admin");
      refreshItems();
    } catch {
      setOpen(true);
    }
  };

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onClickHandler}>追加</Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message="商品登録でエラーが発生しました。商品は追加できませんでした。"
      />
    </>
  );
}

export default ItemRegisterButton;
