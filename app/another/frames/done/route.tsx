/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";
// import { StarItem } from "./components/start-item";
import { FRAMES_BASE_URL, DEGENCAST_WEB_URL } from "@/lib/env";
import { imageOptions } from "@/app/atttoken/frames/frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  // TODO: castHash data from api
  return {
    image: (
      <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
        another done page
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames", query: { inviteFid, castHash } }}
      >
        back
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
