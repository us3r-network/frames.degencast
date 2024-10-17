/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";

  return {
    title: "Degencast Leaderboard",
    image: `${FRAMES_BASE_URL}/images/dcleaderboard/cover.png`,
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
      <Button
        action="post"
        target={{ pathname: "/frames/top-degencaster", query: { inviteFid } }}
        key={"top-degencaster"}
      >
        Top Degencaster
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/profile",
          query: { inviteFid, from: "/frames" },
        }}
        key={"profile"}
      >
        My Profile
      </Button>,
      // <Button
      //   action="link"
      //   target={`${DEGENCAST_WEB_URL}/casts/${castHash.slice(
      //     2
      //   )}?inviteFid=${inviteFid}`}
      // >
      //   Cast
      // </Button>,
      <Button action="link" target={`${DEGENCAST_WEB_URL}`} key={"app"}>
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
