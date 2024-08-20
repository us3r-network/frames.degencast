/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";
import CastInfo from "../../components/CastInfo";
import { ChannelTokenInfo } from "../utils/getChannelTokenInfo";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const { hash, ...channelTokenInfo } = ctx.searchParams as ChannelTokenInfo & {
    hash: string;
  };
  return {
    image: (
      <CastInfo
        castHash={hash}
        channelName={channelTokenInfo.channelName}
        channelId={channelTokenInfo.channelId}
        channelDescription={channelTokenInfo.channelDescription}
        launchProgress={channelTokenInfo.launchProgress}
        state="Upvote"
        successText="Transaction Completed!"
        upvoted={true}
      />
    ),
    imageOptions,
    buttons: [
      <Button action="link" target={`https://base.blockscout.com/tx/${txId}`}>
        View Tx
      </Button>,
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Use frame to vote the proposal`
        )}&embeds[]=${FRAMES_BASE_URL}/proposal/frames/vote?castHash=${hash}`}
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
