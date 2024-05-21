/* eslint-disable react/jsx-key */

export default function SelectDialogItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "0px",
        fontSize: "16px",
      }}
    >
      <div style={{ display: "flex", color: "#A36EFE" }}>{title}</div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
}
