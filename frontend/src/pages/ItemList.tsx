import { Box, Grid } from "@mui/material";

import ItemCard from "../components/ItemCard";

const dummyItemIds = [...Array(20).keys()];
function ItemList() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent="center"
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          {dummyItemIds.map((itemId) => {
            return <ItemCard itemId={itemId} />;
          })}
        </Grid>
      </Box>
    </>
  );
}

export default ItemList;
