import { Box, Grid } from "@mui/material";
import { useRecoilValue } from "recoil";

import ItemCard from "../components/ItemCard";
import { allItemsSelector } from "../store";

function ItemList() {
  const allItems = useRecoilValue(allItemsSelector);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent="center"
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          {allItems.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })}
        </Grid>
      </Box>
    </>
  );
}

export default ItemList;
