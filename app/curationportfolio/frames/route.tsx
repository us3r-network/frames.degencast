/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import DegencastTag from "@/app/components/DegencastTag";
import { error } from "frames.js/core";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getChannelRedirectUrl } from "@/lib/getRedirectUrl";
import { getChannelIdWithCast } from "@/lib/getChannelIdWithCast";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const fid = ctx.searchParams?.fid || "";
  const castHash = ctx.searchParams?.castHash || "";

  let info;
  let nftTokenUnit;
  let launchProgress;

  console.log(
    "url",
    `${DEGENCAST_API}/topics/curators/nfts?fid=${fid}&castHash=${castHash}`
  );
  try {
    const resp = await fetch(
      `${DEGENCAST_API}/topics/curators/nfts?fid=${fid}&castHash=${castHash}`
    );
    info = await resp.json();
  } catch (err) {
    console.error(err);
    throw error("Error fetching castInfo");
  }
  if (!info?.data) {
    const data = await fetch(
      `${FRAMES_BASE_URL}/waitlist-v1/frames?inviteFid=${inviteFid}&fid=${fid}`
    );
    const text = await data.text();
    return new Response(text, {
      headers: { "content-type": "text/html" },
    });
  }
  // console.log("info", info);
  const curator = info?.data?.curator;
  const currNft = info?.data?.currentNft;
  const nextNft = info?.data?.nextNft;
  const preNft = info?.data?.preNft;

  launchProgress = currNft?.boundingCurveProgress || "0%";
  nftTokenUnit = currNft?.nftTokenUnit;

  // console.log("currNft", currNft);

  const castData = await getCastWithHash(currNft.cast.hash);

  return {
    image: (
      <div
        tw="flex flex-col justify-center  relative w-[800px] h-[800px]"
        style={{ background: "#1A1A1A" }}
      >
        <div
          tw="flex items-center justify-center  w-full overflow-hidden rounded-t-lg "
          style={{
            color: "#FFF",
            textAlign: "center",
            fontSize: "40px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "40px",
            height: "80px",
          }}
        >
          <span>Curated by</span>
          <img
            src={`${curator.pfp_url}`}
            alt=""
            width={40}
            height={40}
            tw="border rounded-full"
            style={{}}
          />
          <span>{curator.display_name}</span>
        </div>
        <div tw="flex relative w-[720px] h-[720px] mx-auto">
          <img
            tw="w-full h-full"
            src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${currNft.cast.hash}`}
            alt=""
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              overflow: "hidden",
            }}
            width={720}
            height={720}
          />
          <DegencastTag
            tokenUint={nftTokenUnit || "100000"}
            progress={launchProgress}
            channelIcon={castData.channel?.image_url}
          />
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
      width: 800,
      height: 800,
    },
    textInput: `Enter quantity, default is 1`,
    buttons: [
      ...(preNft
        ? [
            <Button
              action="post"
              target={{
                pathname: "/frames",
                query: { inviteFid, castHash: preNft.cast.hash, fid },
              }}
            >
              ⬅️
            </Button>,
          ]
        : []),
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
            fid,
          },
        }}
      >
        Mint(1/2)
      </Button>,
      <Button action="link" target={`https://degencast.wtf/u/${fid}/feed`}>
        View curator
      </Button>,
      ...(nextNft
        ? [
            <Button
              action="post"
              target={{
                pathname: "/frames",
                query: { inviteFid, castHash: nextNft.cast.hash, fid },
              }}
            >
              ➡️
            </Button>,
          ]
        : []),
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
