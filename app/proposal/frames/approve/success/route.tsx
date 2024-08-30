/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import { ProposalType } from "@/lib/proposal/proposalState";
import { getExplorerUrlWithTx } from "@/app/createproposal/frames/utils/getExplorerUrlWithTx";
import DegencastTag2 from "@/app/components/DegencastTag2";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const type = ctx.searchParams?.type as ProposalType;
  const danAddress = ctx.searchParams?.danAddress || "";
  const currentStance = ctx.searchParams?.currentStance || "";
  const launchProgress = ctx.searchParams?.launchProgress || "0%";

  const transactionId = ctx.message?.transactionId || "";
  const castDataInfo = await getCastWithHash(castHash);

  const castAuthor = castDataInfo?.author;
  const castChannel = castDataInfo?.channel;

  console.log({ type, castHash, inviteFid, danAddress });

  return {
    image: (
      <div tw="bg-[#1a1a1a] flex flex-row  items-center w-full h-full px-[77px] py-[90px]">
        <img
          tw="w-[720px] h-[720px] "
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <div
          tw={`flex flex-col justify-between items-center mt-[16px] h-full text-white w-[687px] ml-[40px] relative`}
        >
          <div tw="flex flex-col w-full">
            <span
              style={{
                color: "#FFF",
                fontSize: "96px",
                fontWeight: 700,
                lineHeight: "120px",
              }}
            >
              Approve Completed
            </span>
            <div
              tw="flex flex-col mt-[30px]"
              style={{
                color: "#9BA1AD",
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "36px",
              }}
            >
              <p tw="p-0 m-0">
                Risk DEGEN to vote and get rewarded for every mint.
              </p>
              <p tw="p-0 m-0">Permanently stored on Arweave.</p>
            </div>
            <div
              tw="flex items-center justify-between mt-[30px]"
              style={{
                color: "#FFF",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "50px",
              }}
            >
              <span>Channel</span>
              <div tw="flex">
                <img
                  src={`${FRAMES_BASE_URL}/images/degenicon.png`}
                  tw="w-[40px] h-[40px] mr-[8px]"
                />
                <span>$DEGEN</span>
              </div>
            </div>
            <div
              tw="flex items-center justify-between mt-[30px]"
              style={{
                color: "#FFF",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "50px",
              }}
            >
              <span>Cast Status</span>
              <span>{currentStance}</span>
            </div>
            <div
              tw="flex items-center justify-between mt-[30px]"
              style={{
                color: "#FFF",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "50px",
              }}
            >
              <span>Vote Staking</span>
              <span>300 DEGEN</span>
            </div>
          </div>
          <DegencastTag2
            username={castAuthor.username}
            pfp_url={castAuthor.pfp_url}
            channelId={castChannel?.id}
          />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `amount minimum 300`,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: type == "Upvote" ? `/tx-data/upvote` : `/tx-data/downvote`,
          query: { danAddress, castHash },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { danAddress, castHash, launchProgress },
        }}
      >
        {type == "Upvote" ? "Upvote👍" : "Challenge👎"}
      </Button>,
      <Button action="link" target={`${getExplorerUrlWithTx(transactionId)}`}>
        View Tx
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}/casts/${castHash.slice(
          2
        )}?inviteFid=${inviteFid}`}
      >
        Cast
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
