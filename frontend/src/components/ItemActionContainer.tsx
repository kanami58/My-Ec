import { Box } from "@mui/material";

import ItemsDelete from "./ItemsDelete";

type Props = {
  selectedIds: number[];
};

function ItemActionContainer(props: Props) {
  return (
    <>
      <Box>
        <button>編集</button>
        <ItemsDelete selectedIds={props.selectedIds} />
      </Box>
    </>
  );
}

export default ItemActionContainer;
