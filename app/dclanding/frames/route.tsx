/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "./frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  return {
    image: `${FRAMES_BASE_URL}/images/dclanding/home.jpg`,
    buttons: [
      <Button action="post" target={{ pathname: "/frames/learnmore" }}>
        Learn More
      </Button>,
      <Button action="post" target={{ pathname: "/frames/getnotify" }}>
        Get notified
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
