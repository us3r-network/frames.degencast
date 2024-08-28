import { FRAMES_BASE_URL } from "@/lib/env";

export default function DegencastTag() {
  return (
    <div
      tw="flex items-center justify-center absolute "
      style={{
        bottom: "28px",
        right: "28px",
        padding: "10px 16px",
        gap: " 4px",
        fontSize: "16px",
        color: "white",
        fontWeight: 700,
        lineHeight: "24px",
        backgroundColor: "#9151C3",
        borderRadius: "30px",
      }}
    >
      <span> Power By</span>
      <img
        src={`${FRAMES_BASE_URL}/images/degencasthat.png`}
        tw="w-[24px] h-[24px]"
      />
      <span> DegenCast</span>
    </div>
  );
}
