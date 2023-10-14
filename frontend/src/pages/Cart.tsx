import { Button } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import CartItemCounter from "../components/CartItemCounter";
import ImageCellRenderer from "../components/ImageCellRenderer";
import SubTotal from "../components/SubTotal";
import { cartItemsSelector } from "../store";
import { CartItem } from "../types";

const columns: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "商品",
    width: 130,
    renderCell: (params) => <ImageCellRenderer value={params.value} />,
  },
  { field: "name", headerName: "商品名", width: 130 },
  {
    field: "count",
    headerName: "数量",
    width: 150,
    renderCell: (params) => (
      <CartItemCounter count={params.value} cartId={params.row.cartId} />
    ),
  },
  { field: "price", headerName: "価格", width: 130 },
];

function Cart() {
  const navigate = useNavigate();

  const cartItems = useRecoilValue(cartItemsSelector);
  return (
    <>
      <h1>カート内の商品</h1>
      <DataGrid
        rows={cartItems}
        getRowId={(row: CartItem) => row.cartId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
      />
      <SubTotal cartItems={cartItems} />
      <Button onClick={()=>navigate('/itemlist')}>商品一覧へ戻る</Button>
    </>
  );
}

export default Cart;
