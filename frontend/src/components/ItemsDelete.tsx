import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { allItemsSelector } from "../store";

type Props = {
  selectedIds: number[];
};

function ItemsDelete(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const errorMessageClose = () => {
    setOpenErrorMessage(false);
  };

  const refreshItems = useRecoilCallback(({ refresh }) =>() => {
    refresh(allItemsSelector);
  });

  const deleteItems = async () => {
    try {
      await fetch("http://localhost:3000/items/delete", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: props.selectedIds }),
      });
      setOpen(false);
      refreshItems();
    } catch {
      setOpen(false);
      setOpenErrorMessage(true);
    }
  };

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
              return (
                <li key={id}>
                  ID:{id} 商品名：
                  {allItems.find((item) => id === item.id)?.name}
                </li>
              );
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMessage}
        onClose={errorMessageClose}
        message="商品削除でエラーが発生しました。商品は削除できませんでした。"
      />
    </>
  );
}

export default ItemsDelete;
