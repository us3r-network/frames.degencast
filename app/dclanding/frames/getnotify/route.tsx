/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  return {
    image: `${FRAMES_BASE_URL}/images/dclanding/notify.jpg`,
    buttons: [
      <Button action="link" target={`https://warpcast.com/liang`}>
        View @liang
      </Button>,
      <Button action="post" target={`https://warpcast.com/~/channel/degencast`}>
        View /degencast
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
