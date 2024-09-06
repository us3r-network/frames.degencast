/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import {
  CURATION_ACTION_LINK,
  DEGENCAST_API,
  DEGENCAST_WEB_URL,
  FRAMES_BASE_URL,
} from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const channelId = ctx.searchParams?.channelId || "";
  const from = ctx.searchParams?.from || "";

  console.log({
    from,
    channelId,
  });

  return {
    image: `${FRAMES_BASE_URL}/images/curationchannel/nomore.png`,
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: from,
          query: { inviteFid, castHash, channelId },
        }}
      >
        ⬅️
      </Button>,
      <Button action="link" target={`${CURATION_ACTION_LINK}`}>
        Install action
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}/communities/${channelId}?inviteFid=${inviteFid}`}
      >
        Curate
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
