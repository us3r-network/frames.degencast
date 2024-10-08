import { CREATE_PROPOSAL_MIN_PRICE } from "@/lib/createproposal/proposal-helper";
import { DEGENCAST_API } from "@/lib/env";
import React from "react";

export default function ImageAndInfo({
  castHash,
  state,
  launchProgress = "TODO",
}: {
  castHash: string;
  state: string;
  launchProgress?: string;
}) {
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
            degencast
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
            /degencast
          </div>
          <div
            style={{
              padding: 0,
              marginTop: "16px",
              color: "#A36EFE",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Minting Curation NFTs is like purchasing Curation Token with great
            potential for appreciation.
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
            <span>{launchProgress}</span>
          </div>
          <div tw="mt-[8px] flex items-center justify-between" style={{}}>
            <span> Current stance:</span>
            <span>{state}</span>
          </div>
          <div tw="mt-[8px] flex items-center justify-between" style={{}}>
            <span>Minimum cost:</span>
            <span>{`${CREATE_PROPOSAL_MIN_PRICE} DEGEN`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
