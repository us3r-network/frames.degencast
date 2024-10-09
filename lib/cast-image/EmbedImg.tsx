import { Embeds } from "../getEmbeds";
import CastText from "./CastText";

export default function EmbedImg({
  text,
  imgs,
}: {
  text: string;
  imgs: Embeds["imgs"];
}) {
  const imgLength = imgs.length;
  if (imgLength === 1) {
    return <OneImg text={text} img={imgs[0]} />;
  }
  if (imgLength === 2) {
    return <TwoImgs text={text} imgs={imgs} />;
  }
  return null;
}

function OneImg({ text, img }: { text: string; img: Embeds["imgs"][0] }) {
  const { metadata, url } = img;
  const { width_px, height_px } = metadata?.image || {};

  if (!width_px || !height_px) {
    return <CastText text={text} />;
  }

  if (width_px >= height_px) {
    const h = 318;
    const w = (width_px / height_px) * h;
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "36px",
            display: "block",
            lineClamp: 10,
          }}
        >
          {text}
        </div>
        <img
          src={url}
          width={w}
          height={h}
          style={{
            maxWidth: "100%",
            borderRadius: "20px",
            objectFit: "cover",
          }}
        />
      </div>
    );
  } else {
    const w = 430;
    const h = (height_px / width_px) * w;
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "100%",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "36px",
            display: "block",
            lineClamp: 20,
          }}
        >
          {text}
        </div>
        <img
          src={url}
          width={w}
          height={h}
          style={{
            maxHeight: "100%",
            borderRadius: "20px",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }
}
function TwoImgs({ text, imgs }: { text: string; imgs: Embeds["imgs"] }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 1,
          width: "100%",
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: "36px",
          display: "block",
          lineClamp: 10,
        }}
      >
        {text}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {imgs.map((img, i) => {
          const { metadata, url } = img;
          const { width_px, height_px } = metadata?.image || {};
          if (!width_px || !height_px) {
            return null;
          }
          const w = 435;
          const h = (height_px / width_px) * w;
          return (
            <img
              src={url}
              width={w}
              height={h}
              style={{
                maxWidth: "50%",
                maxHeight: "318px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
