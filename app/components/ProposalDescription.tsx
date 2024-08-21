import React from "react";

export default function Description() {
  return (
    <div tw="flex flex-col w-full">
      <div
        tw="text-white mt-[16px] flex justify-start items-center w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2" />
        Upvote👍: Turn a cast into a Curation NFT, it would be saved forever on
        Arweave.
      </div>
      <div
        tw="text-white mt-[8px] flex justify-start items-center w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2" />
        Downvote👎: Reject the curation decision.
      </div>
      <div
        tw="text-white mt-[8px] flex flex-col justify-start  w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <div tw="flex items-center">
          <span tw="w-1 h-1 bg-white rounded-full mx-2" />
          Funds: Winner gets principal back, loser’s funds go to the winner
          based on weight.
        </div>
      </div>
      <div
        tw="text-white mt-[8px] flex justify-start items-center w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2" />
        Curators: After curation is approved, top 10 upvoters = curators.
      </div>
    </div>
  );
}
