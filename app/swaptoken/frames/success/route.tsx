/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";
import { DEGENCAST_API, FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const requesterFid = message?.requesterFid!;
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const token = ctx.searchParams?.token || "";

  const reportData = {
    buyerFid: requesterFid,
    sharerFid: inviteFid,
    tx: txId,
  };
  fetch(`${DEGENCAST_API}/degencast-users/frame-actions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportData),
  })
    .then(() => {
      console.log("frame-actions success", reportData);
    })
    .catch(console.error);

  return {
    image: `${FRAMES_BASE_URL}/images/success.png`,
    buttons: [
      <Button
        action="post"
        target={{ pathname: `/frames/swap/${token}`, query: { inviteFid } }}
      >
        Go Swap
      </Button>,
      <Button
        action="link"
        target={`https://www.onceupon.xyz/${txId}?delay=1000`}
      >
        View Tx
      </Button>,
      <Button action="link" target={"https://dev.degencast.xyz"}>
        Leaderboard
      </Button>,
      <Button
        action="post"
        target={{ pathname: "/frames/share", query: { inviteFid, token } }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
