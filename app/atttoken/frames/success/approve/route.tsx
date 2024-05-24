/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";

import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const input = message?.inputText;
  const inviteFid = ctx.searchParams.inviteFid || "";
  const attnft = ctx.searchParams.attnft || "";
  const attTokenAddress = ctx.searchParams.attTokenAddress || "";

  console.log("approve", { txId, input, attTokenAddress, attnft, inviteFid });

  return {
    image: `${FRAMES_BASE_URL}/images/success-approve.png`,
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/burn-nft`,
          query: { inviteFid, amount: input, attnft, attTokenAddress },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, attnft },
        }}
      >
        Next
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
