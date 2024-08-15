/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import ProposalImageAndInfo from "../../../components/ProposalImageAndInfo";
import ProposalDescription from "../../../components/ProposalDescription";
import ProposalHr from "../../../components/ProposalHr";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const type = ctx.searchParams?.type || "";
  const transactionId = ctx.message?.transactionId || "";

  // TODO: next cast
  const nextCastHash = "0x1d083d785ca466887ffb7a3885d7d1636636aa17";

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
        <ProposalImageAndInfo castHash={castHash} state="TODO" />
        <ProposalHr />
        <ProposalDescription />
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: `/frames`,
          query: { castHash: nextCastHash },
        }}
      >
        Next cast
      </Button>,
      <Button
        action="link"
        // target={`https://www.onceupon.xyz/${transactionId}?delay=1000`}
        target={`https://sepolia.basescan.org/tx/${transactionId}`}
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
