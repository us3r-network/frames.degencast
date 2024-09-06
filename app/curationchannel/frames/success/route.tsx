/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import DegencastTag from "@/app/components/DegencastTag";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const channelId = ctx.searchParams?.channelId || "";

  let tokenId;
  let castInfo;
  let communityCuration;
  let nftTokenUnit;
  let launchProgress;
  let preCastHash;
  let nextCastHash;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  const castData = await getCastWithHash(castHash);

  communityCuration = castInfo?.data?.tokenAddr;
  tokenId = castInfo?.data?.tokenId;
  if (!communityCuration) {
    throw error("address is required");
  }
  launchProgress = castInfo?.data.launchProgress;

  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/frames/${castHash}/nextcasthash`
    );
    const data = await castInfoResp.json();
    const preNextResp = await fetch(
      `${DEGENCAST_API}/topics/frames/nfts/${castHash}/casthash`
    );
    const preNextData = await preNextResp.json();
    preCastHash = preNextData.data?.preCast;
    nextCastHash = preNextData.data?.nextCast;
  } catch (err) {
    throw error("Error fetching castInfo");
  }

  return {
    image: (
      <div tw="bg-[#1a1a1a] flex flex-col  items-center w-full h-full px-[32px] py-[0px]">
        <div
          tw="text-white mt-[16px] flex justify-center items-center w-full text-[#fff]"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div tw="flex">Transaction Completed!</div>
        </div>
        <div tw="flex relative w-[720px] h-[720px] mt-[16px]">
          <img
            src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
            alt=""
          />
          <DegencastTag
            tokenUint={nftTokenUnit || "100000"}
            progress={launchProgress}
            channelIcon={castData.channel?.image_url}
          />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `Enter quantity, default is 1`,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: preCastHash ? "/frames/gallery" : "/frames/nomore",
          query: {
            inviteFid,
            castHash: preCastHash || castHash,
            channelId,
            from: "/frames/gallery",
          },
        }}
      >
        ⬅️
      </Button>,
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
        Mint More
      </Button>,

      <Button
        action="post"
        target={{
          pathname: nextCastHash ? "/frames/gallery" : "/frames/nomore",
          query: {
            inviteFid,
            castHash: nextCastHash || castHash,
            channelId,
            from: "/frames/gallery",
          },
        }}
      >
        ➡️
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
