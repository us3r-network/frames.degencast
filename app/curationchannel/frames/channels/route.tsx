/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import {
  DEGENCAST_API,
  DEGENCAST_WEB_URL,
  FRAMES_BASE_URL,
  NFT_TOKEN_UNIT,
} from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";

  return {
    image: `${FRAMES_BASE_URL}/images/curationchannel/cover.png`,
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/frames/info",
          query: { inviteFid },
        }}
      >
        View Channels
      </Button>,
      <Button action="link" target={`${DEGENCAST_WEB_URL}`}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
