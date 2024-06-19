/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import {
  DEGENCAST_WEB_URL,
  FRAMES_BASE_URL,
  TRADE_TOKEN_LEADERBOARD,
} from "@/lib/env";
import { getUserDataWithFid } from "@/lib/hub";
import Item from "./components/Item";
import ItemContainer from "./components/ItemContainer";
import User from "./components/User";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const fname = ctx.searchParams?.fname || "";
  const fid = ctx.searchParams?.fid || "";

  if (!fname || !fid) {
    return {
      image: (
        <div
          tw="text-white w-full h-full flex flex-col items-center justify-center"
          style={{
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('${FRAMES_BASE_URL}/images/bg.png')`,
          }}
        >
          {"Fname is required"}
        </div>
      ),
      imageOptions: imageOptions,
      buttons: [
        <Button
          action="post"
          target={{ pathname: "/frames/checkme", query: { inviteFid } }}
        >
          Check me
        </Button>,
        <Button
          action="link"
          target={`${TRADE_TOKEN_LEADERBOARD}?inviteFid=${inviteFid}`}
        >
          {`View @${fname}`}
        </Button>,
        <Button
          action="link"
          target={`https://dev.degencast.xyz?inviteFid=${inviteFid}`}
        >
          Join Degencast
        </Button>,
      ],
    };
  }

  const user = await getUserDataWithFid(Number(fid));
  return {
    image: (
      <div
        tw="text-white w-full h-full flex flex-col"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${FRAMES_BASE_URL}/images/bg.png')`,
          padding: "56px 56px 0 56px",
        }}
      >
        <User user={user} />
        <ItemContainer>
          <Item title="Balance" value={12345} />
          <Item title="Total Shares" value={12345} />
          <Item title="$CAST" value={1234543141} />
          <Item title="Daily Allowance" value={12345} />
        </ItemContainer>
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/checkme", query: { inviteFid } }}
      >
        Check me
      </Button>,
      (fname && (
        <Button
          action="link"
          target={`${DEGENCAST_WEB_URL}/u/${fid}/tokens?inviteFid=${inviteFid}`}
        >
          {`View @${fname}`}
        </Button>
      )) ||
        null,
      <Button
        action="link"
        target={`https://dev.degencast.xyz?inviteFid=${inviteFid}`}
      >
        Join Degencast
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
