import { FRAMES_BASE_URL } from "../env";
import { NeynarCast, NeynarChannel } from "../createproposal/neynar-types";
import CastContent from "./CastContent";
import { getCastImageUrl } from "../cast";
import { getEmbeds } from "../getEmbeds";

const bgUrl = `${FRAMES_BASE_URL}/images/image-api/cast-bg.jpg`;
const homeImgUrl = `${FRAMES_BASE_URL}/images/image-api/home.png`;
export function Layout({ cast }: { cast: NeynarCast }) {
  const { imgs, videos, webpages, casts } = getEmbeds(cast);
  const hasImg = imgs.length > 0;
  const hasVideo = videos.length > 0;
  const hasWebpage = webpages.length > 0;
  const hasCast = casts.length > 0;
  const useDefaultImg = hasVideo || hasWebpage || hasCast;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "20px",
          paddingLeft: "180px",
          paddingRight: "54px",
          height: 24,
        }}
      >
        <ChannelInfo channel={cast?.channel} />
      </div>
      <div
        style={{
          flex: 1,
          boxSizing: "border-box",
          paddingLeft: "54px",
          paddingRight: "54px",
          paddingBottom: "78px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {useDefaultImg ? (
          <img
            src={getCastImageUrl(cast.hash)}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              color: "#1A1A1A",
            }}
          >
            {" "}
            <UserInfo cast={cast} />
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
              }}
            >
              <CastContent cast={cast} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(date: any) {
  const d = new Date(date);
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}
export function ChannelInfo({ channel }: { channel?: NeynarChannel }) {
  const maxTextLen = 60;
  const { image_url, id } = channel || {};
  const channelId = id || "home";

  const oneLen = channelId.length;
  const count = Math.floor(maxTextLen / oneLen) + 2;

  const symbol = channelId === "home" ? "CAST" : channelId?.toUpperCase();
  const imageUrl = image_url || (channelId === "home" ? homeImgUrl : image_url);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
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
            src={imageUrl}
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
              color: "#ACACC8",
              textTransform: "uppercase",
              lineHeight: "24px",
            }}
          >
            ${symbol}
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
        width: "100%",
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
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "64px",
            fontWeight: 900,
            lineClamp: 1,
            lineHeight: "40px",
          }}
        >
          {author.display_name}
        </span>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
              fontStyle: "italic",
              backgroundColor: "#1A1A1A",
              borderRadius: "9999px",
              color: "white",
              fontSize: "24px",
              fontWeight: 500,
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 8,
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
