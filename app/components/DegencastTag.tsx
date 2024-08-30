import { FRAMES_BASE_URL } from "@/lib/env";

export default function DegencastTag({
  tokenUint,
  progress,
}: {
  tokenUint: string;
  progress: string;
}) {
  return (
    <div
      tw="flex flex-col w-full absolute "
      style={{
        gap: "20px",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 700,
        bottom: "28px",
        right: "0",
      }}
    >
      <div tw="flex items-center justify-end gap-[10px] px-[28px]">
        <div
          tw="flex item-center"
          style={{
            backgroundColor: "#F2B949",
            borderRadius: "30px",
            padding: "10px 16px",
            marginRight: "10px",
          }}
        >
          <span>including {tokenUint}</span>
          <img
            src={`${FRAMES_BASE_URL}/images/degenicon.png`}
            tw="w-[24px] h-[24px] mx-[4px]"
          />
          <span>Curation Token</span>
        </div>
        <div
          tw="flex items-center"
          style={{
            color: "white",
            backgroundColor: "#9151C3",
            borderRadius: "30px",
            padding: "10px 16px",
          }}
        >
          <span> Power By</span>
          <img
            src={`${FRAMES_BASE_URL}/images/degencasthat.png`}
            tw="w-[24px] h-[24px] mx-[4px]"
          />
          <span> Degencast.wtf</span>
        </div>
      </div>
      <div tw="flex items-center px-[28px]">
        <span
          style={{
            flexShrink: 0,
          }}
        >
          Bounding Curve Progress
        </span>
        <div
          tw="flex flex-grow rounded-full h-[24px] w-[424px] mx-[10px] relative"
          style={{
            backgroundColor: "rgba(145, 81, 195, 0.20)",
          }}
        >
          <div
            tw="flex"
            style={{
              backgroundColor: "#9151C3",
              borderRadius: "30px",
              width: progress,
              height: "100%",
              transition: "width",
            }}
          ></div>
        </div>
        <span>{progress}</span>
      </div>
    </div>
  );
}
