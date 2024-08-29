/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from "react";

export default function CastInfo({
  castHash,
  channelName,
  channelLogo,
  title,
  statusText,
}: {
  castHash: string;
  channelName: string;
  channelLogo: string;
  title?: string;
  statusText?: string;
}) {
  return (
    <div
      tw="bg-[#1A1A1A] flex flex-row w-full h-full py-[90px] px-[76px]"
      style={{
        gap: "40px",
      }}
    >
      <img
        tw="w-[720px] h-[720px] rounded-[20px]"
        src={`https://api-dev.u3.xyz/3r-farcaster/cast-image?castHash=${castHash}`}
        alt=""
      />
      <div
        tw="flex-1 h-full flex flex-col"
        style={{
          gap: "30px",
        }}
      >
        <div
          tw="text-white"
          style={{
            fontSize: "96px",
            fontWeight: 700,
            lineHeight: "120px",
          }}
        >
          {title || "Cast Detail"}
        </div>
        <div
          tw="text-[#9BA1AD]"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "36px",
          }}
        >
          {`
              Risk DEGEN to vote and get rewarded for every mint.\r\n
              Permanently stored on Arweave.
          `}
        </div>
        <div
          tw="text-white w-full flex justify-between items-center"
          style={{
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "50px",
          }}
        >
          <div>Channel</div>
          <div
            tw="flex flex-row items-center"
            style={{
              gap: "8px",
            }}
          >
            <img
              tw="w-[40px] h-[40px] rounded-[10px]"
              src={channelLogo}
              alt=""
            />
            <div>{channelName || "————"}</div>
          </div>
        </div>
        <div
          tw="text-white w-full flex justify-between items-center"
          style={{
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "50px",
          }}
        >
          <div>Cast Status</div>
          <div>{statusText}</div>
        </div>
        {/* <div tw="w-full mt-auto">
          {createdBy && (
            <div
              tw="w-full flex flex-row items-center justify-end"
              style={{
                gap: "4px",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              <div>Created by</div>

              <img
                tw="w-[24px] h-[24px] rounded-[30px]"
                src={createdBy.avatar}
                alt=""
              />
              <div>{createdBy.username}</div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
