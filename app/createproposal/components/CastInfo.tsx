/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import ProposalDescription from "@/app/components/ProposalDescription";
import ProposalHr from "@/app/components/ProposalHr";
import React from "react";

export default function CastInfo({
  castHash,
  title,
  upvoted,
  downvoted,
  approved,
}: {
  castHash: string;
  title?: string;
  upvoted?: boolean;
  downvoted?: boolean;
  approved?: boolean;
}) {
  return (
    <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
      {title && (
        <div
          tw="text-white flex justify-center items-center w-full"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div>{title}</div>
        </div>
      )}
      {upvoted && (
        <div
          tw={`flex justify-between items-center w-[540px] text-[#00D1A7]`}
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div>Cast Status:</div>
          <div>{"Upvoted"}</div>
        </div>
      )}
      {downvoted && (
        <div
          tw={`flex justify-between items-center w-[540px] text-[#F41F4C]`}
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div>Cast Status:</div>
          <div>{"Downvoted"}</div>
        </div>
      )}
      {approved && (
        <div
          tw={`flex justify-center items-center w-full text-[#00D1A7]`}
          style={{
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div>Approved Completed!</div>
        </div>
      )}
      <img
        tw="w-[540px] h-[540px] mt-[16px]"
        src={`https://api-dev.u3.xyz/3r-farcaster/cast-image?castHash=${castHash}`}
        alt=""
      />
      <ProposalHr />
      <ProposalDescription />
    </div>
  );
}
