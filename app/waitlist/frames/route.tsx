/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import { FRAMES_BASE_URL } from "@/lib/env";
import { ApiRespCode, joinWaitlist } from "@/lib/api";

const handleGetRequest = frames(async (ctx) => {
  return {
    image: (
      <img
        src={`${FRAMES_BASE_URL}/images/waitlist/join-waitlist.png`}
        alt=""
      />
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/frames",
        }}
      >
        Join Waitlist
      </Button>,
    ],
  };
});

const handlePostRequest = frames(async (ctx) => {
  let joined = Boolean(ctx.searchParams?.joined || "");
  let imgUrl = `${FRAMES_BASE_URL}/images/waitlist/joined-waitlist.png`;
  let buttonText = "Follow Degencast Channel 🔔";
  if (!joined) {
    const requesterFid = ctx.message?.requesterFid!;
    const resp = await joinWaitlist(requesterFid);
    console.log("joinWaitlist response", resp);

    const { code } = resp;
    if (code === ApiRespCode.SUCCESS) {
      joined = true;
    } else {
      imgUrl = `${FRAMES_BASE_URL}/images/waitlist/join-waitlist.png`;
      buttonText = "Join Waitlist";
    }
  }

  return {
    image: <img src={imgUrl} alt="" />,
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/frames",
          query: { joined: joined ? "true" : "" },
        }}
      >
        {buttonText}
      </Button>,
    ],
  };
});

export const GET = handleGetRequest;
export const POST = handlePostRequest;
