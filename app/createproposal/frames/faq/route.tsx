/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const { hash, backPath } = ctx.searchParams as {
    backPath: string;
    hash: string;
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
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}/casts/${hash.slice(2)}`}
      >
        View Cast
      </Button>,
      <Button action="link" target={DEGENCAST_WEB_URL}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
