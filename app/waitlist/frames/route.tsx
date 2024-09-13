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
  const joined = Boolean(ctx.searchParams?.joined || "");
  let imgUrl = `${FRAMES_BASE_URL}/images/waitlist/join-waitlist.png`;
  let buttonText = "Join Waitlist";
  if (!joined) {
    const requesterFid = ctx.message?.requesterFid!;
    const resp = await joinWaitlist(requesterFid);
    console.log({ resp });

    const { code, msg } = resp;
    if (code === ApiRespCode.SUCCESS) {
      imgUrl = `${FRAMES_BASE_URL}/images/waitlist/joined-waitlist.png`;
      buttonText = "Follow Degencast Channel 🔔";
    } else {
      buttonText = "Failed to join, try again";
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
        }}
      >
        {buttonText}
      </Button>,
    ],
  };
});

export const GET = handleGetRequest;
export const POST = handlePostRequest;
