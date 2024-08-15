/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL } from "@/lib/env";
import { frames, imageOptions } from "./frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const imageUri = `https://api-dev.u3.xyz/3r-farcaster/cast-image?castHash=${castHash}`;
  // console.log({ inviteFid, castHash, imageUri });
  return {
    image: (
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
        <div
          tw="text-white w-full justify-center items-center flex"
          style={{
            fontFamily: "Inter",
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          Is it worth becoming a Curation NFT?
        </div>
        <img tw="w-[676px] h-[676px] mt-[32px]" src={imageUri} alt="" />
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/vote", query: { inviteFid, castHash } }}
      >
        Vote
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        View Cast
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
