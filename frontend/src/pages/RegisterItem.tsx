import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";
import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

import ItemRegisterButton from "../components/ItemRegisterButton";

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function RegisterItem() {
  const [imageFileName, setImageFileName] = useState("");
  const [doropedFile, setDropedFile] = useState<File & { preview: string }>();
  const [imageBase64, setImageBase64] = useState<string>("");

  function changeImageToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.currentTarget) return;
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void = useCallback((acceptedFiles) => {
    // Do something with the files
    setImageFileName(acceptedFiles[0].name);

    const file = acceptedFiles[0];
    const newFile = Object.assign(file, { preview: URL.createObjectURL(file) });
    setDropedFile(newFile);
    changeImageToBase64(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [name, setName] = useState<string>('');
  const [price, setPrice]  = useState<number>(0);

  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="商品名"
        value={name}
        onChange={(e)=> {
          setName(e.target.value)
        }}
      />
      <NumberInput
        slots={
          {
          }
        }
        slotProps={{
          incrementButton: {
            children: <span className="arrow">▴</span>,
          },
          decrementButton: {
            children: <span className="arrow">▾</span>,
          },
        }}
        value={price}
        onChange={(e, val)=> {
          if (!val) return;
          setPrice(val)
        }}
      />

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>この画像を登録</p>
        ) : (
          <p>商品画像をドロップしてください</p>
        )}
        <p>{imageFileName}</p>
        {doropedFile && (
          <div style={thumb} key={doropedFile.name}>
            <div style={thumbInner}>
              <img
                src={doropedFile.preview}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(doropedFile.preview);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <ItemRegisterButton name={name} price={price} imageUrl={imageBase64} />
    </>
  );
}

export default RegisterItem;
