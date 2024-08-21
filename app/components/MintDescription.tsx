import React from "react";

export default function MintDescription() {
  return (
    <div tw="flex flex-col w-full">
      <div
        tw="text-white mt-[16px] flex justify-start w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2 mt-[8px]" />
        NFT transaction fee: Degencast 1%, Channel host 2%, Creator 3%,
        ,Curators 4%.
      </div>
      <div
        tw="text-white mt-[8px] flex justify-start w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2 mt-[8px" />
        When NFT bounding curve reaches a market cap of 4,206,900 DEGEN, all the
        liquidity will be deposited into Uniswap v3.
      </div>
      <div
        tw="text-white mt-[8px] flex justify-start w-full"
        style={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        <span tw="w-1 h-1 bg-white rounded-full mx-2 mt-[8px" />
        After token launch, Curation NFT = Curation Token.
      </div>
    </div>
  );
}
