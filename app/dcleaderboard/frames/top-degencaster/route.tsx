/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";

  return {
    title: "Degencast Leaderboard",
    image: (
      <div tw="bg-[#1a1a1a] flex flex-col w-[800px] h-[800px] p-[20px]">
        <div tw="flex items-center justify-center bg-[#1a1a1a] w-full ">
          <span
            style={{
              color: "#FFF",
              fontFamily: "Inter",
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "40px",
            }}
          >
            Top 10 DegenCasters
          </span>
        </div>
        <div tw="flex flex-col gap-[24px] w-full bg-[#000] mt-[20px] p-[20px] h-full">
          <table
            tw="flex flex-col w-full border-separate border-spacing-0 text-white"
            style={{
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "40px",
            }}
          >
            <thead tw="w-full">
              <tr tw="w-full flex-row">
                <th tw="w-[100px]">Rank</th>
                <th tw="flex-grow">DegenCasters</th>
                <th tw="">$CAST Points</th>
              </tr>
            </thead>
            <tbody tw="w-full ">
              <tr tw="w-full flex flex-row  mt-[20px]">
                <td tw="w-[100px]">1</td>
                <td tw="flex flex-grow items-center">
                  <div tw="flex w-[40px] h-[40px] bg-[#fff] overflow-hidden rounded-full">
                    <img
                      src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/e2336234-90f9-4b3d-8e9c-78edc7da8700/original"
                      alt=""
                      tw=""
                    />
                  </div>
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    $CHANNELTOKEN
                  </span>
                </td>
                <td tw="">24,235</td>
              </tr>
            </tbody>
          </table>
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
        target={{ pathname: "/frames/top-tokens", query: { inviteFid } }}
        key={"top-tokens"}
      >
        Top Tokens
      </Button>,
      <Button action="link" target={`${DEGENCAST_WEB_URL}`} key={"app"}>
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
