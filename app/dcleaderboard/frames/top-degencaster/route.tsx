/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";

  const resp = await fetch(
    `${DEGENCAST_API}/topics/points/leaderboard?limit=10`
  );
  const data = await resp.json();
  const leaderboard: {
    user: {
      username: string;
      pfp_url: string;
    };
    points: number;
  }[] = data?.data || [];

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
        <div
          tw="flex flex-col gap-[24px] w-full bg-[#000] mt-[20px] p-[20px] h-[705px]"
          style={{
            borderRadius: "20px",
          }}
        >
          <table
            tw="flex flex-col w-full h-ful text-white"
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
            <tbody tw="w-full flex flex-col">
              {leaderboard.slice(0, 10).map((user, index) => {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <tr tw="w-full flex flex-row  mt-[20px]" key={index}>
                    <td tw="w-[100px]">{index + 1}</td>
                    <td tw="flex flex-grow items-center">
                      {user.user.pfp_url && (
                        <img
                          src={user.user.pfp_url}
                          alt=""
                          tw="flex w-[40px] h-[40px] bg-[#fff] overflow-hidden rounded-full"
                        />
                      )}
                      <span
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {user.user.username}
                      </span>
                    </td>
                    <td tw="">{user.points}</td>
                  </tr>
                );
              })}
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
        target={{
          pathname: "/frames/profile",
          query: { inviteFid, from: "/frames/top-degencaster" },
        }}
        key={"profile"}
      >
        Check Me
      </Button>,
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
