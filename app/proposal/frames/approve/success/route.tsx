/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import ProposalImageAndInfo from "../../../../components/ProposalImageAndInfo";
import ProposalDescription from "../../../../components/ProposalDescription";
import ProposalHr from "../../../../components/ProposalHr";
import { ProposalType } from "@/lib/proposal/proposalState";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const type = ctx.searchParams?.type as ProposalType;
  const danAddress = ctx.searchParams?.danAddress || "";
  const currentStance = ctx.searchParams?.currentStance || "";
  const launchProgress = ctx.searchParams?.launchProgress || "0%";

  const transactionId = ctx.message?.transactionId || "";

  console.log({ type, castHash, inviteFid, danAddress });

  return {
    image: (
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
        <div
          tw="text-white mt-[32px] flex justify-center items-center w-full text-[#00D1A7]"
          style={{
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div>Approve Completed!</div>
        </div>
        <div tw="h-[12px]"></div>
        <ProposalImageAndInfo
          castHash={castHash}
          state={currentStance}
          launchProgress={launchProgress}
        />
        <ProposalHr />
        <ProposalDescription />
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
          query: { danAddress, castHash },
        }}
      >
        {type}
      </Button>,
      <Button
        action="link"
        target={`https://base.blockscout.com/tx/${transactionId}`}
      >
        View Tx
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        View Cast
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
