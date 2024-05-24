/* eslint-disable react/jsx-key */

import { frames, imageOptions } from "../frames";
import { Button } from "frames.js/next";
import { reportBuyAttNftSuccess } from "@/lib/report";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const attnft = ctx.searchParams?.attnft || "";
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const requesterFid = message?.requesterFid!;
  if (txId) {
    const reportData = {
      buyerFid: `${requesterFid}`,
      sharerFid: inviteFid,
      tx: txId,
    };
    reportBuyAttNftSuccess(reportData);
  }

  return {
    image: `${FRAMES_BASE_URL}/images/success.png`,
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/shares", query: { attnft } }}
      >
        Buy more
      </Button>,
      <Button
        action="post"
        target={{ pathname: "/frames/allowance", query: { attnft, inviteFid } }}
      >
        Allowance
      </Button>,
      <Button
        action="post"
        target={{ pathname: "/frames/share", query: { attnft, inviteFid } }}
      >
        Share & Earn
      </Button>,
      <Button
        action="link"
        target={`https://dev.degencast.xyz?inviteFid=${inviteFid}`}
      >
        More shares
      </Button>,
      // {txId &&}
      // <Button
      //   action="link"
      //   target={`https://www.onceupon.xyz/${txId}?delay=1000`}
      // >
      //   View Tx
      // </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
