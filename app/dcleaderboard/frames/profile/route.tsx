/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";

import { FRAMES_BASE_URL, DEGENCAST_WEB_URL, DEGENCAST_API } from "@/lib/env";
import { frames } from "../frames";
import { error } from "frames.js/core";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const searchFid = ctx.searchParams?.searchFid || "";
  const requesterFid = ctx.message?.requesterFid || "";

  const profileFid = searchFid || `${requesterFid}`;

  console.log({ profileFid });
  if (!profileFid) {
    return error("Profile not found");
  }

  // https://api-dev.u3.xyz/topics/frames/profiles?fid=19585
  const resp = await fetch(
    `${DEGENCAST_API}/topics/frames/profiles?fid=${profileFid}`
  );
  const data = await resp.json();
  const user = data?.data?.user;
  const mintCount = data?.data?.mintCount || 0;
  const rank = data?.data?.rank || 0;
  const points = data?.data?.points || 0;

  if (!user) {
    return error("Profile not found");
  }

  return {
    title: "Degencast Leaderboard",
    image: (
      <div tw="bg-[#1a1a1a] flex flex-col w-[800px] h-[800px]">
        <div tw="flex items-center justify-center bg-[#1a1a1a] h-[46px] w-full ">
          <span
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px" /* 100% */,
              textTransform: "uppercase",
            }}
          >
            DEGENCASTER
          </span>
        </div>
        <div
          tw="flex flex-col gap-[24px] w-full bg-[#000] pb-[32px] pt-[32px] h-full"
          style={{
            border: "10px solid #1A1A1A",
            borderTop: "0px",
          }}
        >
          <div tw="flex flex-row w-[716px] h-[280px] px-[32px] gap-[32px]">
            <div
              tw="flex w-[280px] h-[280px]"
              style={{
                border: "20px solid #9151C3",
              }}
            >
              <div
                tw="flex w-[240px] h-[240px]"
                style={{
                  border: "20px solid #A36EFE",
                  backgroundColor: "white",
                }}
              >
                <img src={user.pfp_url} alt="" />
              </div>
            </div>
            <div
              tw="flex flex-col items-start justify-center w-[384px] h-[280px] ml-[32px]"
              style={{
                color: "#FFF",
                fontFamily: "Inter",

                fontStyle: "normal",
              }}
            >
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "120%",
                }}
              >
                {user.display_name}
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  lineHeight: "150%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {`@${user.username}`}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "150%",
                }}
              >
                {user.profile.bio.text}
              </span>
            </div>
          </div>
          <div
            tw="flex mt-[24px] mb-[24px] h-[56px] w-full"
            style={{
              backgroundImage: `url('${FRAMES_BASE_URL}/images/block.png')`,
            }}
          />
          <div tw="flex flex flex-col w-[716px] h-[280px] px-[32px]">
            <div tw="flex ">
              <Label text="minted" />
              <div tw="flex w-[16px]" />
              <Value text={`${mintCount}`} />
            </div>
            <div tw="flex mt-[16px] mb-[16px]">
              <Label text="$CAST" />
              <div tw="flex w-[16px]" />
              <Value text={`${points}`} />
            </div>
            <div tw="flex ">
              <Label text="RANK" />
              <div tw="flex w-[16px]" />
              <Value text={`${rank}`} />
            </div>
          </div>
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

function Value({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        width: "349px",
        height: "90px",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        textTransform: "uppercase",
        borderRadius: "9px",
        backgroundColor: "#F41F4C",
      }}
    >
      <span
        style={{
          // -webkit-text-stroke-width: 3;
          // -webkit-text-stroke-color: #FFF;
          color: "#FFF",
          WebkitTextStrokeWidth: "3px",
          WebkitTextStrokeColor: "#FFF",
          fontFamily: "Changa",
          fontSize: "53px",
          fontWeight: "400",
          lineHeight: "39px",
          letterSpacing: "4.77px",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        width: "349px",
        height: "90px",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        textTransform: "uppercase",
        borderRadius: "9px",

        backgroundColor: "#4C2896",
      }}
    >
      <span
        style={{
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Changa",
          fontSize: "53px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "39px" /* 73.585% */,
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}
