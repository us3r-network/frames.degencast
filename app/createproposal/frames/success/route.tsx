/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const FRAME_BASE_URL = process.env.FRAMES_BASE_URL;

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  return {
    image: `${FRAME_BASE_URL}/images/success.png`,
    buttons: [
      <Button
        action="link"
        target={`https://www.onceupon.xyz/${txId}?delay=1000`}
      >
        View Tx
      </Button>,
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Use frame to vote the proposal`
        )}&embeds[]=${FRAMES_BASE_URL}/proposal/vote`}
      >
        Share Frame
      </Button>,
      <Button action="link" target={`https://dev.degencast.wtf`}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
