import { FRAMES_BASE_URL } from "../env";
import { NeynarCast } from "../createproposal/neynar-types";
import CastContent from "./CastContent";

export function Layout({ cast }: { cast: NeynarCast }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "40px",
        paddingTop: "20px",
        paddingBottom: "20px",
        backgroundImage: "linear-gradient(90deg, #000c3f 0%, #23006c 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={`${FRAMES_BASE_URL}/images/base.png`}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <span
          style={{
            fontSize: "96px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          Base
        </span>
      </div>
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          borderRadius: "30px",
          backgroundColor: "white",
          color: "#1A1A1A",
        }}
      >
        <UserInfo cast={cast} />
        <CastContent cast={cast} />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1",
            fontWeight: "bold",
          }}
        >
          <span> Power By</span>
          <img
            src={`${FRAMES_BASE_URL}/images/degencasthat.png`}
            width={24}
            height={24}
          />
          <span> Degencast.wtf</span>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: any) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function UserInfo({ cast }: { cast: NeynarCast }) {
  const author = cast.author;
  console.log("author", author);

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
        width={80}
        height={80}
        style={{
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          {author.display_name}
        </span>
        <div
          // tw="flex flex-row items-center gap-[16px]"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "center",
            color: "#9BA1AD",
            fontSize: "24px",
            fontWeight: 400,
          }}
        >
          <span>@{author.username}</span>
          <div
            style={{
              backgroundColor: "#9BA1AD",
              width: 2,
              height: 20,
            }}
          />
          <span>{formatDate(cast.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
