/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";
import TransactionResult from "../../components/TransactionResult";
import { getExplorerUrlWithTx } from "../utils/getExplorerUrlWithTx";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const { hash } = ctx.searchParams as {
    hash: string;
  };
  return {
    image: <TransactionResult castHash={hash} completed={true} />,
    imageOptions,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Use frame to vote the proposal`
        )}&embeds[]=${FRAMES_BASE_URL}/proposal/frames?castHash=${hash}&embeds[]=https://warpcast.com/~/conversations/${hash}`}
      >
        Share Frame
      </Button>,
      <Button action="link" target={getExplorerUrlWithTx(txId as any)}>
        View Tx
      </Button>,
      <Button action="link" target={`https://dev.degencast.wtf`}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
