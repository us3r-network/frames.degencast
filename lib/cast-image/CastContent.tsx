import { NeynarCast } from "../createproposal/neynar-types";

export default function CastContent({ cast }: { cast: NeynarCast }) {
  const { text, embeds } = cast;
  const embedLen = embeds.length;
  if (embedLen === 0) {
    return <CastText text={text} />;
  }
  return null;
}

function CastText({
  text,
  lineClamp = 20,
}: {
  text: string;
  lineClamp?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: "vertical",
        fontSize: "24px",
      }}
    >
      {text}
    </div>
  );
}
