import { FRAMES_BASE_URL } from "@/lib/env";

export default function DegencastTag2({
  username,
  pfp_url,
  channelId,
}: {
  username?: string;
  pfp_url?: string;
  channelId?: string;
}) {
  return (
    <div
      tw="flex absolute flex-col "
      style={{
        bottom: "0px",
        right: "0px",
        fontSize: "16px",
        color: "white",
        fontWeight: 700,
        lineHeight: "24px",
      }}
    >
      <div tw="flex justify-end items-center">
        <span>Created by</span>
        {pfp_url && (
          <img src={pfp_url} tw="w-[24px] h-[24px] rounded-full mx-[4px]" />
        )}
        <span>{username}</span>
        <span>{`/${channelId || "home"}`}</span>
      </div>

      <div
        tw="flex items-center justify-end mt-[20px]"
        style={{
          gap: " 4px",
        }}
      >
        <span>Power By</span>
        <img
          src={`${FRAMES_BASE_URL}/images/degencasthat.png`}
          tw="w-[24px] h-[24px]"
        />
        <span>Degencast.wtf</span>
      </div>
    </div>
  );
}
