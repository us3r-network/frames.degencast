/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames, imageOptions } from "./frames";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import DegencastTag2 from "@/app/components/DegencastTag2";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const castInfo = await getCastWithHash(castHash);

  const castAuthor = castInfo?.author;
  const castChannel = castInfo?.channel;
  const imageUri = `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`;
  console.log({ inviteFid, castHash, imageUri, castChannel });
  return {
    image: (
      <div tw="bg-[#1a1a1a] flex flex-row items-center w-full h-full px-[77px] py-[90px]">
        <img tw="w-[720px] h-[720px]" src={imageUri} alt="" />
        <div
          tw="text-white w-[687px] h-full justify-center flex relative ml-[40px]"
          style={{
            fontFamily: "Inter",
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div
            tw="flex flex-col w-full"
            style={{
              color: "#FFF",

              textAlign: "center",
              fontSize: "96px",
              fontWeight: 700,
              lineHeight: "120px",
            }}
          >
            <span> Make this Mintable in </span>
            <div tw="flex items-center justify-center">
              {castChannel?.image_url && (
                <img
                  src={`${castChannel?.image_url}`}
                  tw="w-[80px] h-[80px] mr-[4px]"
                />
              )}
              <span>{`${castChannel?.name || ""}?`}</span>
            </div>
          </div>
          <DegencastTag2
            username={castAuthor?.username}
            pfp_url={castAuthor?.pfp_url}
            channelId={castChannel?.id}
          />
        </div>
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
        action="post"
        target={{
          pathname: "/frames/faq",
          query: { inviteFid, castHash, from: "/frames" },
        }}
      >
        FAQ
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}/casts/${castHash.slice(
          2
        )}?inviteFid=${inviteFid}`}
      >
        Cast
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
