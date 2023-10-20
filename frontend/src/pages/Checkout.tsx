import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";

import CheckoutForm from "../components/CheckoutForm";
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
  },
  { field: "price", headerName: "価格", width: 130 },
];

function Checkout() {
  const cartItems = useRecoilValue(cartItemsSelector);

  return (
    <>
      <Box display={"flex"}>
        <Box width={"50%"}>
          <CheckoutForm />
        </Box>
        <Box width={"50%"}>
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
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
