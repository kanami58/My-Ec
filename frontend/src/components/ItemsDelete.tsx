import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { allItemsSelector } from "../store";

type Props = {
  selectedIds: number[];
};

function ItemsDelete(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteItems = () => {
    
  }

  const allItems = useRecoilValue(allItemsSelector);

  return (
    <>
      <Button color="error" onClick={() => setOpen(true)}>
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.selectedIds.map((id) => {
              return <li key={id}>ID:{id} 商品名：{allItems.find(item => id === item.id)?.name}</li>;
            })}
            商品を削除します。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>戻る</Button>
          <Button onClick={deleteItems} autoFocus>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ItemsDelete;
