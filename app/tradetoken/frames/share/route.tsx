/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const requesterFid = message?.requesterFid!;
  return {
    image: `${FRAMES_BASE_URL}/images/share-more.png`,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Use the frame to swap or sign up, we both get $CAST!`
        )}&embeds[]=${FRAMES_BASE_URL}/tradetoken/frames?inviteFid=${requesterFid}&timestamp=${Date.now()}`}
      >
        Share Frame & Earn Points
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
