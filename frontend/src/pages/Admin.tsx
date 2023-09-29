import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";

import { allItemsSelector } from "../store";
import { useNavigate } from "react-router-dom";

function ImageCellRenderer({ value }: { value: string }) {
  return (
    <img src={value} alt="Image" style={{ width: "50px", height: "50px" }} />
  );
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "imageUrl",
    headerName: "Image Url",
    width: 130,
    renderCell: (params) => <ImageCellRenderer value={params.value} />,
  },
];

function Admin() {
  const navigate = useNavigate();
  const allItems = useRecoilValue(allItemsSelector);
  return (
    <>
      <button onClick={()=> navigate('/admin/item/register')}>商品追加</button>
      <DataGrid
        rows={allItems}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </>
  );
}
export default Admin;
