function ImageCellRenderer({ value }: { value: string }) {
  return (
    <img src={value} alt="Image" style={{ width: "50px", height: "50px" }} />
  );
}

export default ImageCellRenderer;
