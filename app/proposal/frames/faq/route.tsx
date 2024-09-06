/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_WEB_URL } from "@/lib/env";
import { getChannelRedirectUrl } from "@/lib/getRedirectUrl";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getChannelIdWithCast } from "@/lib/getChannelIdWithCast";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const from = ctx.searchParams?.from || "";
  const danAddress = ctx.searchParams?.danAddress || "";
  const cast = await getCastWithHash(castHash);
  const channelId = getChannelIdWithCast(cast);

  return {
    image: (
      <div tw="flex flex-col relative bg-[#1A1A1A] p-[32px] w-full h-full  text-[#fff]">
        <div
          tw="text-white flex justify-center items-center w-full text-[#fff] mt-[32px]"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div tw="flex">How it works?</div>
        </div>
        <div
          tw="flex mt-[16px]"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          Curate
        </div>
        {[
          "Upvote: Turn a cast into a Curation NFT.",
          "Downvote: Reject the curation decision.",
          "Vote cost: Minimum cost = Curation NFT price.",
          "Weight: Vote weight = √spent.",
        ].map((item, i) => {
          return (
            <div
              key={item}
              tw="text-white mt-[16px] flex justify-start items-center w-full"
              style={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              <span tw="w-1 h-1 bg-white rounded-full mx-2" />
              {item}
            </div>
          );
        })}
        <div
          tw="text-white mt-[16px] flex justify-start items-center w-full"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
        >
          <span tw="w-1 h-1 bg-white rounded-full mx-2" />
          Challenge: Disagree with current stance.
        </div>
        <div
          tw="text-white flex justify-start items-center w-full"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
        >
          <span tw="w-1 h-1 rounded-full mx-2" />
          Challenge extends countdown by 1 hour. One challenge per account per
          phase.
        </div>
        {[
          "Win: Stance must have 2x the weight to win.",
          "Result: Final stance after countdown.",
          "Funds: Winner gets principal back, loser’s funds go to the winner based on weight.",
          "Curators: After curation is approved, top 10 upvoters = curators. The earlier the more revenue.",
        ].map((item, i) => {
          return (
            <div
              key={item}
              tw="text-white mt-[16px] flex justify-start items-center w-full"
              style={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              <span tw="w-1 h-1 bg-white rounded-full mx-2" />
              {item}
            </div>
          );
        })}
        <div
          tw="flex  mt-[16px] "
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          Curation NFT
        </div>
        {[
          "Curation NFT = 1000 Curation Token.",
          "NFT transaction fee: Degencast 1%, Channel host 2%, Creator 3%, ,Curators 4%.",
          "When bounding curve reaches a market cap of 4,206,900 DEGEN, all the liquidity will be deposited into Uniswap v3.",
          "After token launch, Curation NFT = 1000 Curation Token.",
        ].map((item, i) => {
          return (
            <div
              key={item}
              tw="text-white mt-[16px] flex justify-start  w-full"
              style={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              <span tw="w-1 h-1 bg-white rounded-full mx-2 mt-[10px]" />
              {item}
            </div>
          );
        })}
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: from,
          query: { inviteFid, castHash, danAddress },
        }}
      >
        Back
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/vote",
          query: { inviteFid, castHash },
        }}
      >
        Vote
      </Button>,
      <Button
        action="link"
        target={`https://warpcast.com/~/conversations/${castHash}`}
      >
        Cast
      </Button>,
      <Button
        action="link"
        target={getChannelRedirectUrl(channelId, inviteFid)}
      >
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
