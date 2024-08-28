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
import DegencastTag from "@/app/components/DegencastTag";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  const transactionId = ctx.message?.transactionId || "";
  const connectWallet = ctx.message?.connectedAddress || "";

  let nextCastHash = "";
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

  communityCuration = castInfo?.data?.tokenAddr;
  tokenId = castInfo?.data?.tokenId;
  if (!communityCuration) {
    throw error("address is required");
  }
  const launchProgress = castInfo?.data.launchProgress;

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
    <Button
      action="post"
      target={{
        pathname: `/frames/faq`,
        query: { castHash, inviteFid },
      }}
    >
      FAQ
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
  buttons.unshift(
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
      Mint more
    </Button>
  );

  return {
    image: (
      <div tw="bg-[#1a1a1a] flex flex-col  items-center w-full h-full px-[32px] py-[0px]">
        <div
          tw="text-white mt-[16px] flex justify-center items-center w-full text-[#fff]"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div tw="flex">Transaction Completed!</div>
        </div>
        <div tw="flex relative w-[720px] h-[720px] mt-[16px]">
          <img
            src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
            alt=""
          />
          <DegencastTag />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `Enter quantity, default is 1`,
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
