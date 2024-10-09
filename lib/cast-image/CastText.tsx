export default function CastText({ text }: { text: string }) {
  const isLongText = text.length > 1024;
  return (
    <div
      tw="px-[20px]"
      style={{
        height: "100%",
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "36px",
        ...(isLongText
          ? {
              display: "block",
              lineClamp: 19,
            }
          : {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }),
      }}
    >
      {text}
    </div>
  );
}
