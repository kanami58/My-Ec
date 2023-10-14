import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { allItemsSelector } from "../store";

function ItemDetail() {
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const allItems = useRecoilValue(allItemsSelector);
  const item = allItems.find((item) => Number(id) === item.id);

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  if (item == null) {
    return <>存在しない商品です</>;
  }

	const onClickHandler = async () => {
    try {
      await fetch("http://localhost:3000/cart/add", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, userId: 1, count: 1 }),
      });
      navigate("/cart");
    } catch {
      setOpen(true);
    }
  };

  return (
    <>
      商品詳細ページ
      <li>ID: {id}</li>
      <li>商品名: {item.name} </li>
      <li>価格： {item.price}</li>
      <img src={item.imageUrl} alt={item.name} />
      <div>
        <Button onClick={() => navigate("/itemlist")}>商品一覧に戻る</Button>
        <Button onClick={() => onClickHandler()}>カートへ入れる</Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message="カートへ追加時にエラーが発生しました。商品は追加できませんでした。"
      />
    </>
  );
}

export default ItemDetail;
