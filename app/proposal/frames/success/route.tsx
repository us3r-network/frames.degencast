/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import ProposalImageAndInfo from "../../../components/ProposalImageAndInfo";
import ProposalDescription from "../../../components/ProposalDescription";
import ProposalHr from "../../../components/ProposalHr";
import { getProposal } from "@/lib/proposal/helper";
import { getProposalState } from "@/lib/proposal/proposalState";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const danAddress = ctx.searchParams?.danAddress as `0x`;
  const launchProgress = ctx.searchParams?.launchProgress || "0%";
  const transactionId = ctx.message?.transactionId || "";

  const proposal = await getProposal(danAddress, castHash);
  console.log({ proposal });

  const castProposalState: number = proposal.state;
  const currentStance: string = getProposalState(castProposalState);
  // TODO: next cast
  let nextCastHash = "";
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/frames/${castHash}/nextcasthash`
    );
    const data = await castInfoResp.json();
    nextCastHash = data?.data;
  } catch (err) {
    throw error("Error fetching castInfo");
  }

  const buttons = [
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
  ];

  if (nextCastHash) {
    buttons.unshift(
      <Button
        action="post"
        target={{
          pathname: `/frames`,
          query: { castHash: nextCastHash, inviteFid },
        }}
      >
        Next cast
      </Button>
    );
  }

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
          <div>Transaction Completed!</div>
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
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
