/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import {
  DEGENCAST_API,
  DEGENCAST_WEB_URL,
  FRAMES_BASE_URL,
  NFT_TOKEN_UNIT,
} from "@/lib/env";
import DegencastTag from "@/app/components/DegencastTag";
import { error } from "frames.js/core";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { formatEther } from "viem";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const channelId = ctx.searchParams?.channelId || "home";

  let channelInfo;

  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/frame/channel?id=${channelId}`
    );
    channelInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  console.log(channelInfo);
  const { data } = channelInfo;
  const { name, imageUrl, progress, curationNftCount, nftPrice } = data;
  const castHash = data.castHash;

  return {
    image: (
      <div tw="flex flex-col w-full h-full  relative p-[40px] bg-[#1a1a1a] text-white">
        <div tw="flex items-center justify-start">
          <img
            src={imageUrl}
            tw="w-[100px] h-[100px] mr-[20px] "
            style={{
              borderRadius: "100px",
            }}
          />
          <span
            style={{
              fontSize: "96px",
              fontWeight: 700,
            }}
          >
            {name}
          </span>
        </div>
        <div
          tw="flex mt-[30px] justify-between items-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "40px",
          }}
        >
          <span>Bounding Curve Progress</span>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            {progress}
          </span>
        </div>
        <div
          tw="flex rounded-full h-[24px] w-[720px] mt-[30px] relative"
          style={{
            backgroundColor: "rgba(145, 81, 195, 0.20)",
          }}
        >
          <div
            tw="flex"
            style={{
              backgroundColor: "#9151C3",
              borderRadius: "30px",
              width: progress,
              height: "100%",
              transition: "width",
            }}
          ></div>
        </div>
        <div
          tw="flex mt-[30px] justify-between items-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "40px",
          }}
        >
          <span>Curation NFT</span>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            {curationNftCount || "0"}
          </span>
        </div>
        <div
          tw="flex mt-[30px] justify-between items-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "40px",
          }}
        >
          <span>NFT Price</span>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            {parseFloat(formatEther(BigInt(nftPrice))).toFixed(6)} DEGEN
          </span>
        </div>
        <div tw="flex mt-[30px]">
          <img
            src={`${FRAMES_BASE_URL}/images/curationchannel/all.jpg`}
            alt=""
            tw="h-[320px]"
          />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: castHash ? "/frames/gallery" : "/frames/nomore",
          query: { inviteFid, castHash, channelId, from: "/frames" },
        }}
      >
        Gallery
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
