/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import {
  DEGENCAST_API,
  DEGENCAST_WEB_URL,
  FRAMES_BASE_URL,
  OPENSEA_BASE_URL,
} from "@/lib/env";
import DegencastTag from "@/app/components/DegencastTag";
import { error } from "frames.js/core";
import { shortPubKey } from "@/lib/utils";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  let tokenId;
  let castInfo;
  let communityCuration;

  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  communityCuration = castInfo?.data.tokenAddr;
  tokenId = castInfo?.data.tokenId;

  return {
    image: (
      <div tw="flex relative">
        <img
          tw=""
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <div
          tw="flex item absolute"
          style={{
            left: "28px",
            bottom: "28px",
            width: "338px",
            padding: "20px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            borderRadius: "20px",
            background: "rgba(180, 163, 212, 0.80)",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          <div tw="flex items-center justify-between w-full">
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Contract Address
            </span>
            <span>{shortPubKey(communityCuration)}</span>
          </div>
          <div tw="flex items-center justify-between w-full">
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Token ID
            </span>
            <span>{tokenId}</span>
          </div>
          <div tw="flex items-center justify-between w-full">
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Token Standard
            </span>
            <span>ERC-1155 | ERC-20</span>
          </div>
          <div tw="flex items-center justify-between w-full">
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Chain
            </span>
            <div tw="flex items-center">
              <img
                src={`${FRAMES_BASE_URL}/images/baseicon.png`}
                alt=""
                tw="w-[16px] h-[16px] mr-[4px]"
              />
              Base
            </div>
          </div>
        </div>
        <DegencastTag />
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `Enter quantity, default is 1`,
    buttons: [
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
          },
        }}
      >
        Mint
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/faq",
          query: { inviteFid, castHash },
        }}
      >
        FAQ
      </Button>,
      <Button
        action="link"
        target={`${OPENSEA_BASE_URL}/${communityCuration}/${tokenId}`}
      >
        Opensea
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
