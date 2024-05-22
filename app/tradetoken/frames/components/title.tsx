export default function Title({ text }: { text: string }) {
  return (
    <div
      tw="w-full justify-center items-center flex flex-col "
      style={{
        textShadow: "4px 4px 0px #4C2896, 4px 4px 0px #4C2896",
        fontSize: "45px",
        fontStyle: "normal",
        fontWeight: "700",
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
}
