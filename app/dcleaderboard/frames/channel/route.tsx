/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const searchFid = ctx.searchParams?.searchFid || "";
  const requesterFid = ctx.message?.requesterFid || "";

  const profileFid = searchFid || requesterFid;

  return {
    title: "Degencast Leaderboard",
    image: (
      <div tw="flex flex-col w-full h-full  relative p-[40px] bg-[#1a1a1a] text-white">
        <div tw="flex items-center justify-start">
          {/* <img
            src={imageUrl}
            tw="w-[100px] h-[100px] mr-[20px] "
            style={{
              borderRadius: "100px",
            }}
          /> */}
          <span
            style={{
              fontSize: "96px",
              fontWeight: 700,
            }}
          >
            {"$CAST"}
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
            {"70%"}
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
              width: "70%",
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
            {"100"}
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
            {"2456 DEGEN"}
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
      <Button
        action="post"
        target={{ pathname: "/frames/profile", query: { inviteFid } }}
        key={"top-tokens"}
      >
        Check Me
      </Button>,
      <Button action="link" target={`${DEGENCAST_WEB_URL}`} key={"app"}>
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
