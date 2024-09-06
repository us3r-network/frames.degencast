/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import {
  CURATION_ACTION_LINK,
  DEGENCAST_API,
  DEGENCAST_WEB_URL,
  FRAMES_BASE_URL,
} from "@/lib/env";
import { error } from "frames.js/core";
import { shortPubKey } from "@/lib/utils";
import { getChannelRedirectUrl } from "@/lib/getRedirectUrl";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  let tokenId;
  let castInfo;
  let communityCuration;
  let curators;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  communityCuration = castInfo?.data?.tokenAddr;
  tokenId = castInfo?.data?.tokenId;
  curators = castInfo?.data?.curators || [];

  const cast = await getCastWithHash(castHash);
  const channelId = cast?.channel?.id || "home";

  return {
    image: (
      <div tw="flex flex-col relative bg-[#1A1A1A] p-[32px] w-full h-full  text-[#fff]">
        <div
          tw="text-white flex justify-center items-center w-full text-[#fff]"
          style={{
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div tw="flex">How it works?</div>
        </div>
        <div
          tw="flex mt-[16px]"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          Curate
        </div>
        {[
          "Upvote/Downvote: Create or reject a Curation NFT.",
          "Vote Cost & Weight: Costs the NFT price; weight depends on spending.",
          "Challenge: Extend countdown; need double the weight to win.",
          "Curators: Top 10 early upvoters earn more.",
        ].map((item, i) => {
          return (
            <div
              key={item}
              tw="text-white mt-[16px] flex justify-start items-center w-full"
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "24px",
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
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          Curation NFT
        </div>
        {[
          "Token Value: Each NFT equals 1000 Curation Tokens.",
          "Fees Distribution: 1% to Degencast, 2% to host, 3% to creators, 4% to curators.",
          "Bonding Curve: Shared curve; liquidity moves to Uniswap at 42069 DEGEN cap.",
          "After Launch: NFT still equals 1000 Tokens.",
        ].map((item, i) => {
          return (
            <div
              key={item}
              tw="text-white mt-[16px] flex justify-start  w-full"
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              <span tw="w-1 h-1 bg-white rounded-full mx-2 mt-[10px]" />
              {item}
            </div>
          );
        })}
        <div tw="flex border-b border-white mt-[16px] h-[1px] w-full"></div>
        <div
          tw="flex  mt-[16px] "
          style={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          NFT Details
        </div>
        <div
          tw="flex justify-between mt-[16px]"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          <span>Contract Address</span>
          <span>{shortPubKey(communityCuration)}</span>
        </div>
        <div
          tw="flex justify-between mt-[16px]"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          <span>Token ID</span>
          <span>{tokenId}</span>
        </div>

        <div
          tw="flex justify-between mt-[16px]"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          <span>Token Standard</span>
          <span>ERC1155 | ERC20</span>
        </div>
        <div
          tw="flex justify-between mt-[16px]"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          <span>Chain</span>

          <div tw="flex items-center">
            <img
              src={`${FRAMES_BASE_URL}/images/baseicon.png`}
              alt=""
              tw="w-[16px] h-[16px] mr-[4px]"
            />
            <span> Base</span>
          </div>
        </div>
        {curators.length > 0 && (
          <div
            tw="flex justify-between items-center mt-[16px]"
            style={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            <span>First Curator</span>
            <div tw="flex items-center">
              {curators[0]?.pfp_url && (
                <img
                  src={`${curators[0]?.pfp_url}`}
                  alt=""
                  tw="w-[24px] h-[24px] mr-[4px] rounded-full"
                />
              )}
              <span>{curators[0]?.username || ""}</span>
            </div>
          </div>
        )}
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `Enter quantity, default is 1`,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/frames",
          query: { inviteFid, castHash },
        }}
      >
        Back
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: "/tx-data/approve",
          query: { inviteFid, castHash },
        }}
        post_url={{
          pathname: `/frames/approve/success`,
          query: {
            inviteFid,
            castHash,
          },
        }}
      >
        Mint
      </Button>,
      <Button action="link" target={`${CURATION_ACTION_LINK}`}>
        Install action
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
