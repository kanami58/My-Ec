import { Button } from "@mui/material";
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

  if (item == null) {
    return <>存在しない商品です</>;
  }

  return (
    <>
      商品詳細ページ
      <li>ID: {id}</li>
      <li>商品名: {item.name} </li>
      <li>価格： {item.price}</li>
      <img src={item.imageUrl} alt={item.name} />
			<div>
				<Button onClick={() => navigate("/itemlist")}>商品一覧に戻る</Button>
				<Button onClick={() => console.log('商品をカートに入れました')}>カートへ入れる</Button>
			</div>

    </>
  );
}

export default ItemDetail;
