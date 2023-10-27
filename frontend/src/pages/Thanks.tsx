import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Thanks() {
  const navigate = useNavigate();

  return (
    <>
      商品の購入が完了しました。
      <Button onClick={() => navigate("/")}>商品一覧へ戻る</Button>
    </>
  );
}

export default Thanks;
