import { DEGENCAST_API } from "@/lib/env";
import React from "react";

export default function ImageAndMint({
  castHash,
  price,
  channelName,
  channelId,
  channelDescription,
}: {
  castHash: string;
  price: string;
  channelName?: string;
  channelId?: string;
  channelDescription?: string;
}) {
  const priceNumber = parseFloat(price);
  return (
    <div tw="flex flex-row mt-[20px]">
      <img
        tw="w-[360px] h-[360px]"
        src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
        alt=""
      />
      <div tw="w-[16px]"></div>
      <div tw="text-white flex flex-col justify-between w-[360px] ">
        <div tw="flex flex-col">
          <div
            style={{
              padding: 0,
              fontSize: "40px",
              fontWeight: 700,
              lineHeight: "40px",
            }}
          >
            {channelName || "————"}
          </div>
          <div
            style={{
              padding: 0,
              marginTop: "8px",
              color: "#9BA1AD",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            {channelId ? `/${channelId}` : "————"}
          </div>
          <div
            tw="line-clamp-3"
            style={{
              padding: 0,
              marginTop: "16px",
              color: "#A36EFE",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            {channelDescription}
          </div>
        </div>
        <div
          tw="flex flex-col "
          style={{
            padding: 0,
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div tw="flex items-center justify-between">
            <span> Launch Progress:</span>
            <span>{"Mint"}</span>
          </div>
          <div tw="mt-[8px] flex items-center justify-between" style={{}}>
            <span>Price:</span>
            <span>{`${priceNumber.toFixed(5)} DEGEN`}</span>
          </div>
          {/* <div tw="mt-[8px] flex items-center justify-between" style={{}}>
            <span>Holding:</span>
            <span>TODO</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
