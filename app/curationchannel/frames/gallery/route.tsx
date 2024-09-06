/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import DegencastTag from "@/app/components/DegencastTag";
import { error } from "frames.js/core";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const channelId = ctx.searchParams?.channelId || "";

  let castInfo;
  let nftTokenUnit;
  let launchProgress;
  let preCastHash;
  let nextCastHash;
  console.log("castHash", castHash);

  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();

    const preNextResp = await fetch(
      `${DEGENCAST_API}/topics/frames/nfts/${castHash}/casthash`
    );
    const preNextData = await preNextResp.json();
    preCastHash = preNextData.data?.preCast;
    nextCastHash = preNextData.data?.nextCast;
  } catch (err) {
    console.log(err);
    throw error("Error fetching castInfo");
  }
  launchProgress = castInfo?.data?.launchProgress || "0%";
  nftTokenUnit = castInfo?.data?.nftTokenUnit;

  const castData = await getCastWithHash(castHash);

  //   console.log("castInfo", castInfo);
  //   console.log(castData);
  console.log({
    preCastHash,
    nextCastHash,
  });

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
          channelIcon={castData.channel?.image_url}
        />
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
        Mint
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
