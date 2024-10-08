import { FRAMES_BASE_URL } from "../env";
import { NeynarCast, NeynarChannel } from "../createproposal/neynar-types";
import CastContent from "./CastContent";
import { getCastImageUrl } from "../cast";

const bgUrl = `${FRAMES_BASE_URL}/images/image-api/cast-bg.jpg`;
export function Layout({ cast }: { cast: NeynarCast }) {
  const embedLen = cast?.embeds?.length || 0;
  if (embedLen !== 0) {
    return (
      <img
        src={getCastImageUrl(cast.hash)}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
  return (
    <div
      style={{
        boxSizing: "border-box",
        paddingLeft: "54px",
        paddingRight: "54px",
        paddingTop: "148px",
        paddingBottom: "148px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        position: "relative",
      }}
    >
      {cast?.channel && <ChannelInfo channel={cast.channel} />}

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          color: "#1A1A1A",
        }}
      >
        <UserInfo cast={cast} />
        <CastContent cast={cast} />
      </div>
    </div>
  );
}

function formatDate(date: any) {
  const d = new Date(date);
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}
export function ChannelInfo({ channel }: { channel: NeynarChannel }) {
  const maxTextLen = 60;
  const { image_url, name } = channel;

  const oneLen = name.length;
  const count = Math.floor(maxTextLen / oneLen) + 2;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        position: "absolute",
        top: "26px",
        boxSizing: "border-box",
        paddingLeft: 140,
        paddingRight: 54,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img
            src={image_url}
            width={16}
            height={16}
            style={{
              borderRadius: 9999,
            }}
          />
          <span
            style={{
              fontStyle: "italic",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1A1A1A",
              textTransform: "uppercase",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
export function UserInfo({ cast }: { cast: NeynarCast }) {
  const author = cast.author;
  const timeStr = formatDate(cast.timestamp);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <img
        src={author.pfp_url}
        width={100}
        height={100}
        style={{
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <span
          tw="leading-none"
          style={{
            fontSize: "64px",
            fontWeight: 900,
          }}
        >
          {author.display_name}
        </span>
        <div
          tw="leading-none"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontStyle: "italic",
              fontSize: "24px",
              fontWeight: 500,
              color: "#1A1A1A",
            }}
          >
            @{author.username}
          </span>
          <span
            style={{
              width: "190px",
              fontStyle: "italic",
              backgroundColor: "#1A1A1A",
              borderRadius: "9999px",
              color: "white",
              fontSize: "24px",
              fontWeight: 500,
              textAlign: "center",
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: timeStr.length === 10 ? 14 : 18,
              paddingRight: 8,
            }}
          >
            {timeStr}
          </span>
        </div>
      </div>
    </div>
  );
}
