import { Embeds } from "../getEmbeds";
import CastText from "./CastText";

export default function EmbedOg({
  text,
  ogs,
}: {
  text: string;
  ogs: Embeds["ogs"];
}) {
  const imgLength = ogs.length;
  if (!text) {
    if (imgLength === 1) {
      return <OneOg og={ogs[0]} />;
    }
    if (imgLength === 2) {
      return <TwoOgs ogs={ogs} />;
    }
    return null;
  } else {
    if (imgLength === 1) {
      return <OneOgText text={text} og={ogs[0]} />;
    }
    if (imgLength === 2) {
      return <TwoOgsText text={text} ogs={ogs} />;
    }
    return null;
  }
}

function OneOgComponent({ og }: { og: Embeds["ogs"][0] }) {
  const { metadata, url } = og;
  const { ogImage, twitterImage, ogTitle } = metadata?.html || {};
  const imgUrl = ogImage?.[0]?.url || twitterImage?.[0]?.url || "";

  return (
    <div
      style={{
        height: 180,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 20,
        boxSizing: "border-box",
        borderRadius: "30px",
        border: "2px solid #1A1A1A",
        padding: "20px",
      }}
    >
      {!!imgUrl && (
        <img
          src={imgUrl}
          width={140}
          height={140}
          style={{
            borderRadius: "20px",
            objectFit: "cover",
          }}
        />
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "36px",
            display: "block",
            lineClamp: 2,
          }}
        >
          {ogTitle}
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "36px",
            display: "block",
            lineClamp: 1,
            color: "#9BA1AD",
          }}
        >
          {new URL(url).host}
        </div>
      </div>
    </div>
  );
}

function OneOg({ og }: { og: Embeds["ogs"][0] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OneOgComponent og={og} />
    </div>
  );
}

function TwoOgs({ ogs }: { ogs: Embeds["ogs"] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: 40,
      }}
    >
      {ogs.map((og, i) => (
        <OneOgComponent og={og} key={i} />
      ))}
    </div>
  );
}

function OneOgText({ text, og }: { text: string; og: Embeds["ogs"][0] }) {
  const ogLink = og.url;
  const showText = text.replace(ogLink, "");
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
        {showText}
      </div>

      <OneOgComponent og={og} />
    </div>
  );
}

function TwoOgsText({ text, ogs }: { text: string; ogs: Embeds["ogs"] }) {
  const ogLinks = ogs.map((og) => og.url);
  const showText = text.replace(ogLinks[0], "").replace(ogLinks[1], "");
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
          lineClamp: 7,
        }}
      >
        {showText}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {ogs.map((og, i) => (
          <OneOgComponent og={og} key={i} />
        ))}
      </div>
    </div>
  );
}
