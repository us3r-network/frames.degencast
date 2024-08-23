/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import ProposalHr from "../../../components/ProposalHr";
import MintDescription from "@/app/components/MintDescription";
import { getExplorerUrlWithTx } from "@/app/createproposal/frames/utils/getExplorerUrlWithTx";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  const transactionId = ctx.message?.transactionId || "";
  const connectWallet = ctx.message?.connectedAddress || "";

  let tokenId;
  let castInfo;
  let communityCuration;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }

  communityCuration = castInfo?.data.tokenAddr;
  tokenId = castInfo?.data.tokenId;
  if (!communityCuration) {
    throw error("address is required");
  }
  const launchProgress = castInfo?.data.launchProgress;

  let nextCastHash = "";
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/frames/${castHash}/nextcasthash`
    );
    const data = await castInfoResp.json();
    console.log("nextdata", data);
    nextCastHash = data?.data;
  } catch (err) {
    throw error("Error fetching castInfo");
  }

  const buttons = [
    <Button action="link" target={`${getExplorerUrlWithTx(transactionId)}`}>
      View Tx
    </Button>,
    <Button
      action="link"
      target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
    >
      Start curating
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
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full px-[32px] py-[0px]">
        <div
          tw="text-white mt-[16px] flex justify-center items-center w-full text-[#00D1A7]"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div>Transaction Completed!</div>
        </div>
        <img
          tw="w-[540px] h-[540px] mt-[16px]"
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <div
          tw="flex justify-between items-center mt-[16px] text-white w-full"
          style={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "24px",
          }}
        >
          <div>Launch Progress:</div>
          <div>{launchProgress}</div>
        </div>
        <ProposalHr />
        <MintDescription />
      </div>
    ),
    imageOptions: imageOptions,
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
