import React from "react";

export default function Description() {
  return (
    <div tw="flex flex-col w-full">
      <div
        tw="text-white mt-[30px] flex justify-start items-center w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2" />
        Upvote: Turn a cast into a Curation NFT.
      </div>
      <div
        tw="text-white mt-[16px] flex justify-start items-center w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2" />
        Downvote: Reject the curation decision.
      </div>
      <div
        tw="text-white mt-[16px] flex flex-col justify-start  w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <div tw="flex items-center">
          <span tw="w-1 h-1 bg-white rounded-full mx-2" />
          Challenge: Disagree with current stance.
        </div>
        <div tw="flex items-center">
          <span tw="w-1 h-1  rounded-full mx-2" />
          Challenge extends countdown by 1 hour. One challenge per account per
          phase.
        </div>
      </div>
      <div
        tw="text-white mt-[16px] flex justify-start items-center w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2" />
        Funds: Winner gets principal back, loser’s funds go to the winner based
        on weight.
      </div>
    </div>
  );
}
