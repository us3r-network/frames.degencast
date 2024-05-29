/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { FRAMES_BASE_URL, TRADE_TOKEN_LEADERBOARD } from "@/lib/env";
import { getUserDataByFid, getUserDataWithFid } from "@/lib/hub";
import User from "../components/User";
import ItemContainer from "../components/ItemContainer";
import Item from "../components/Item";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const fname = ctx.searchParams?.fname || "";
  const requesterFid = message?.requesterFid!;
  const user = await getUserDataByFid(Number(requesterFid));

  return {
    image: (
      <div
        tw="text-white w-full h-full flex flex-col"
        style={{
          padding: "56px 56px 0 56px",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${FRAMES_BASE_URL}/images/bg.png')`,
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
        Refresh
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/share",
          query: { inviteFid, fid: requesterFid, fname: user.username },
        }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
