/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_API, FRAMES_BASE_URL } from "@/lib/env";
import { error } from "frames.js/core";
import { formatEther } from "viem";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  let channelId = ctx.searchParams?.channelId;

  console.log("channelId", channelId);

  let nextChannelId;
  let preChannelId;

  if (!channelId) {
    try {
      const currentChannelResp = await fetch(
        `${DEGENCAST_API}/topics/frames/channels`
      );
      const data = await currentChannelResp.json();
      channelId = data?.data?.currentChannel?.id;
    } catch (err) {
      console.log(`${DEGENCAST_API}/topics/frames/channels`, err);
      throw error("Get channel failed, try a late.");
    }
  }

  if (!channelId) {
    throw error("Get channel failed, try a late.");
  }

  try {
    const channelsResp = await fetch(
      `${DEGENCAST_API}/topics/frames/channels?channelId=${channelId}`
    );
    const data = await channelsResp.json();
    preChannelId = data?.data?.preChannel?.id;
    nextChannelId = data?.data?.nextChannel?.id;
  } catch (err) {
    throw error("Get channel failed, try a late.");
  }

  let channelInfo;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/frame/channel?id=${channelId}`
    );
    channelInfo = await castInfoResp.json();
  } catch (err) {
    console.error(err);
    throw error("Error happened, try a late.");
  }
  console.log(`${DEGENCAST_API}/topics/frame/channel?id=${channelId}`);
  console.log("channelInfo", channelInfo);
  const data = channelInfo?.data;
  if (!data) {
    throw error("Error happened, try a late.");
  }
  const { name, imageUrl, curationNftCount, nftPrice } = data;
  const castHash = data.castHash;
  if (!castHash || !name || !imageUrl) {
    throw error("Error happened, try a late.");
  }
  let progress = data.progress;
  if (progress === "NaN%") {
    progress = "0%";
  }

  console.log({ nextChannelId, preChannelId });
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
      ...(preChannelId
        ? [
            <Button
              action="post"
              target={{
                pathname: "/frames/info",
                query: { inviteFid, channelId: preChannelId },
              }}
            >
              ⬅️
            </Button>,
          ]
        : []),
      <Button
        action="post"
        target={{
          pathname: "/frames",
          query: { inviteFid, castHash, channelId, from: "/frames/info" },
        }}
      >
        Gallery
      </Button>,
      ...(nextChannelId
        ? [
            <Button
              action="post"
              target={{
                pathname: "/frames/info",
                query: { inviteFid, channelId: nextChannelId },
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
