/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import DegencastTag from "@/app/components/DegencastTag";
import { error } from "frames.js/core";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  let tokenId;
  let communityCuration;
  let castInfo;
  let nftTokenUnit;
  let launchProgress;

  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  launchProgress = castInfo?.data?.launchProgress || "0%";
  nftTokenUnit = castInfo?.data?.nftTokenUnit;

  console.log("castInfo", castInfo);
  console.log(
    "img",
    `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`,
    `${FRAMES_BASE_URL}/images/degecasthat.png`
  );

  return {
    image: (
      <div tw="flex relative">
        <img
          tw=""
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <DegencastTag
          tokenUint={nftTokenUnit || "100000"}
          progress={launchProgress}
        />
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `Enter quantity, default is 1`,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: "/tx-data/approve",
          query: { inviteFid, castHash },
        }}
        post_url={{
          pathname: `/frames/approve/success`,
          query: {
            inviteFid,
            castHash,
          },
        }}
      >
        Mint
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/faq",
          query: { inviteFid, castHash },
        }}
      >
        Detail
      </Button>,
      <Button
        action="link"
        target={`https://warpcast.com/~/conversations/${castHash}`}
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
