/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import {
  getCastRedirectUrl,
  getChannelRedirectUrl,
} from "@/lib/getRedirectUrl";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const { hash, backPath, channelId } = ctx.searchParams as {
    backPath: string;
    hash: string;
    channelId: string;
  };
  return {
    image: <img src={`${FRAMES_BASE_URL}/images/atttoken/faq.png`} alt="" />,
    imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: backPath,
        }}
      >
        Back
      </Button>,
      <Button action="link" target={getCastRedirectUrl(hash)}>
        View Cast
      </Button>,
      <Button action="link" target={getChannelRedirectUrl(channelId)}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
