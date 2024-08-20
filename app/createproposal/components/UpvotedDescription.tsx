import React from "react";

export default function UpvotedDescription() {
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
        Curation NFT = 1000 Curation Token.
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
        NFT transaction fee: Degencast 1%, Channel host 2%, Creator 3%,
        ,Curators 4%.
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
          All Curation NFTs share a same bonding curve.
        </div>
        <div tw="flex items-center">
          <span tw="w-1 h-1  rounded-full mx-2" />
          When bounding curve reaches a market cap of 4,206,900 DEGEN, all the
          liquidity will be deposited into Uniswap v3.
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
        After token launch, Curation NFT = 1000 Curation Token.
      </div>
    </div>
  );
}
