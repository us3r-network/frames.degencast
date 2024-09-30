import { NeynarCast } from "../createproposal/neynar-types";

export default function CastContent({ cast }: { cast: NeynarCast }) {
  const { text, embeds } = cast;
  const embedLen = embeds.length;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        width="100%"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "flex",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="50"
          style={{
            display: "flex",
            fill: "red",
          }}
        >
          <animate
            attributeName="cx"
            begin="0s"
            dur="10s"
            from="50"
            to="100%"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

function CastText({ text }: { text: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // 最后一行的文字超出显示省略号
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical",
        fontSize: "24px",
      }}
    >
      {text}
    </div>
  );
}
