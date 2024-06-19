export default function Item({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div tw="flex flex-row" style={{}}>
      <span style={{ color: "#A36EFE" }}>{`${title}`}</span>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <span style={{ color: "#000" }}>{value.toLocaleString()}</span>
    </div>
  );
}
