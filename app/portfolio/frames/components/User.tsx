/* eslint-disable @next/next/no-img-element */
import { FRAMES_BASE_URL } from "@/lib/env";

export default function User({
  user,
}: {
  user: { username: string; pfp: string };
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",

        gap: "18px",
      }}
    >
      <div
        tw="flex justify-center items-center"
        style={{
          backgroundImage: `url(${FRAMES_BASE_URL}/images/atttoken/pixel-border.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: "165px",
          height: "165px",
          padding: "8px",
        }}
      >
        <img src={`${user.pfp}`} alt="" />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "510px",
        }}
      >
        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            fontSize: "22px",
            marginTop: "-20px",
          }}
        >
          <span>{user.username.toUpperCase()}</span>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
        </div>
        <div
          tw="flex flex-row"
          style={{
            color: "white",
            fontSize: "22px",
            marginTop: "10px",
          }}
        >
          <span style={{ color: "#A36EFE" }}>{`$SPELL`}</span>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
          <span>4,234</span>
        </div>
      </div>
    </div>
  );
}
