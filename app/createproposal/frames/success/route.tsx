/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import { getExplorerUrlWithTx } from "../utils/getExplorerUrlWithTx";
import CastInfo from "../../components/CastInfo";
import { getChannelTokenInfo } from "../utils/getChannelTokenInfo";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const { hash, channelId } = ctx.searchParams as {
    hash: string;
    channelId?: string;
  };
  const channelTokenInfo = await getChannelTokenInfo(channelId!);
  const { channelName, channelLogo } = channelTokenInfo;
  return {
    image: (
      <CastInfo
        castHash={hash}
        title={`Approved Completed!`}
        statusText={"Voteable"}
        channelName={channelName}
        channelLogo={channelLogo}
      />
    ),
    imageOptions,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Use frame to vote the proposal`
        )}&embeds[]=${FRAMES_BASE_URL}/proposal/frames?castHash=${hash}&embeds[]=https://warpcast.com/~/conversations/${hash}${
          channelId ? `&channelKey=${channelId}` : ""
        }`}
      >
        Share Frame
      </Button>,
      <Button action="link" target={getExplorerUrlWithTx(txId as any)}>
        View Tx
      </Button>,
      <Button action="link" target={DEGENCAST_WEB_URL}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
