/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const requesterFid = message?.requesterFid!;
  const attnft = ctx.searchParams?.attnft!;
  return {
    image: `${FRAMES_BASE_URL}/images/share-more.png`,
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Use the frame to swap or sign up, we both get $CAST!`
        )}&embeds[]=${FRAMES_BASE_URL}/atttoken/frames?inviteFid=${requesterFid}&attnft=${attnft}`}
      >
        Share Frame & Earn Points
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
