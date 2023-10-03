import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import ItemActionContainer from "../components/ItemActionContainer";
import { allItemsSelector } from "../store";

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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <>
      <button onClick={() => navigate("/admin/item/register")}>商品追加</button>
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
        onRowSelectionModelChange={(e) => {
          setSelectedIds(e as number[]);
        }}
      />
      {selectedIds.length > 0 && (
        <ItemActionContainer selectedIds={selectedIds} />
      )}
    </>
  );
}
export default Admin;
