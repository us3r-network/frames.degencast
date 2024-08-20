/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  return {
    image: (
      <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex flex-col">
        <div>communityCuration mint frame</div>
        <div>{castHash}</div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/done", query: { inviteFid, castHash } }}
      >
        done
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;