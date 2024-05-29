/* eslint-disable react/jsx-key */
import { FRAMES_BASE_URL } from "@/lib/env";
import { frames, imageOptions, pixelFont } from "../frames";
import { Button } from "frames.js/next";
import { NextRequest } from "next/server";
import SwapItem from "../components/swap-item";
import { getTokenData } from "@/lib/getTokenData";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const inviteFid = ctx.searchParams.inviteFid || "";
  const page = Number(ctx.searchParams.page || 1);
  const origin = ctx.searchParams.origin || "";

  const tokenData = await getTokenData();
  const position = (page - 1) * 2;
  const pageTokens = tokenData.slice(position, position + 2);
  const hasLeft = tokenData.length > page * 2;

  return {
    image: (
      <div
        tw="text-white w-full h-full flex flex-col"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${FRAMES_BASE_URL}/images/bg.png')`,
          padding: "35px 80px",
        }}
      >
        <div
          tw="w-full justify-center items-center flex flex-col "
          style={{
            textShadow: "4px 4px 0px #4C2896, 4px 4px 0px #4C2896",
            fontSize: "30px",
            fontStyle: "normal",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {"Trade shares"}
        </div>
        <div
          tw="flex flex-row w-full justify-center items-center mt-[20px]"
          style={{
            gap: "20px",
          }}
        >
          {pageTokens.map((token: any) => {
            return <SwapItem />;
          })}
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [
      (page > 1 && (
        <Button
          action="post"
          target={{
            pathname: `/frames/select`,
            query: { page: page - 1, inviteFid },
          }}
        >
          Back
        </Button>
      )) || (
        <Button
          action="post"
          target={{
            pathname: origin === "rank" ? `/frames/rank` : `/frames`,
            query: {
              inviteFid,
              origin,
            },
          }}
        >
          Back
        </Button>
      ),
      pageTokens.length > 0 && (
        <Button
          action="post"
          target={{
            pathname: `/frames/shares`,
            // TODO: tokenInfo in query
            query: { page, inviteFid, origin, attnft: "degen" },
          }}
        >
          {pageTokens[0].name}
        </Button>
      ),
      pageTokens.length > 1 && (
        <Button
          action="post"
          target={{
            pathname: `/frames/shares`,
            // TODO: tokenInfo in query
            query: { page, inviteFid, origin, attnft: "degen" },
          }}
        >
          {pageTokens[1].name}
        </Button>
      ),
      hasLeft && (
        <Button
          action="post"
          target={{
            pathname: `/frames/select`,
            query: { inviteFid, origin, page: page + 1 },
          }}
        >
          Next
        </Button>
      ),
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
