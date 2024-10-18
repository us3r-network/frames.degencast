/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames } from "../frames";
import { error } from "frames.js/core";
import { formatEther } from "viem";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  let channelId = ctx.message?.inputText || ctx.searchParams?.channelId || "";
  if (channelId) {
    channelId = channelId.replace("/", "");
  }

  console.log({ channelId });

  let channels = undefined;
  try {
    const channelsResp = await fetch(
      `${DEGENCAST_API}/topics/frames/channels?id=${channelId}`
    );
    channels = await channelsResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }

  console.log(channels);

  const currChannel = channels?.data?.currentChannel;
  if (!currChannel) {
    throw error("Channel not found");
  }
  const preChannel = channels?.data?.preChannel;
  const nextChannel = channels?.data?.nextChannel;

  let progress = currChannel.progress || "0%";

  // const { name, imageUrl, curationNftCount, nftPrice } = channels.data;
  // const castHash = data.castHash;
  // let progress = data.progress;
  if (progress === "NaN%") {
    progress = "0%";
  }

  const { curationNftCount, nftPrice } = currChannel;

  return {
    title: "Degencast Leaderboard",
    image: (
      <div tw="flex flex-col w-full h-full  relative p-[40px] bg-[#1a1a1a] text-white">
        <div tw="flex items-center justify-start">
          <img
            src={currChannel.image_url}
            tw="w-[100px] h-[100px] mr-[20px] "
            style={{
              borderRadius: "100px",
            }}
            alt=""
          />
          <span
            style={{
              fontSize: "96px",
              fontWeight: 700,
            }}
          >
            {`$${currChannel.name}`}
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
          <span>Token Launch Progress</span>
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
          />
        </div>
        <div
          tw="flex mt-[30px] justify-between items-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "40px",
          }}
        >
          <span>Available for minting</span>
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
          <span>Token Price</span>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            {Number.parseFloat(formatEther(BigInt(nftPrice))).toFixed(6)} DEGEN
          </span>
        </div>
        <div tw="flex mt-[30px]">
          <img
            src={`${FRAMES_BASE_URL}/images/dcleaderboard/all.png`}
            alt=""
            tw="h-[320px]"
          />
        </div>
      </div>
    ),
    imageOptions: {
      width: 800,
      height: 800,
      aspectRatio: "1:1",
    },
    buttons: [
      ...(preChannel?.id
        ? [
            <Button
              action="post"
              target={{
                pathname: "/frames/channel",
                query: {
                  inviteFid,
                  channelId: preChannel?.id,
                  // from: "/frames/gallery",
                },
              }}
              key={"back"}
            >
              ⬅️
            </Button>,
          ]
        : []),

      ...(nextChannel?.id
        ? [
            <Button
              action="post"
              target={{
                pathname: "/frames/channel",
                query: {
                  inviteFid,
                  channelId: nextChannel?.id,
                },
              }}
              key={"next"}
            >
              ➡️
            </Button>,
          ]
        : []),
      <Button
        action="post"
        target={{ pathname: "/frames", query: { inviteFid } }}
        key={"home"}
      >
        Home
      </Button>,
      <Button action="link" target={`${DEGENCAST_WEB_URL}`} key={"app"}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
