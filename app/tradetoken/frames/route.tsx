/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, pixelFont } from "./frames";
import { StarItem } from "./components/start-item";
import { FRAMES_BASE_URL, TRADE_TOKEN_LEADERBOARD } from "@/lib/env";
import { getTokenData } from "@/lib/getTokenData";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  let tokenData;
  try {
    tokenData = await getTokenData();
  } catch (e) {
    console.error("fail to getTokenData", e);
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
          {"Error"}
        </div>
      ),
      imageOptions: {
        fonts: [
          {
            data: pixelFont,
            name: "upheaval",
          },
        ],
      },
      buttons: [
        <Button
          action="post"
          target={{ pathname: "/frames", query: { inviteFid } }}
        >
          Retry
        </Button>,
      ],
    };
  }
  const top3 = tokenData.slice(0, 3);
  return {
    image: (
      <div
        tw="text-white w-full h-full flex flex-col"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${FRAMES_BASE_URL}/images/bg.png')`,
        }}
      >
        <div
          tw="w-full justify-center items-center flex flex-col "
          style={{
            textShadow: "4px 4px 0px #4C2896, 4px 4px 0px #4C2896",
            fontSize: "45px",
            fontStyle: "normal",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {"TOP 3 TOKENS"}
        </div>
        <div
          tw="flex flex-col w-full mt-[25px]"
          style={{
            gap: "25px",
          }}
        >
          {top3.map((token: any) => {
            return (
              <StarItem
                title={token.id}
                imageURL={token.imageURL}
                value={1}
                fdvUsd={Number(token.stats.fdv_usd)}
                priceChange24={Number(token.stats.price_change_percentage.h24)}
              />
            );
          })}
        </div>
      </div>
    ),
    imageOptions: {
      fonts: [
        {
          data: pixelFont,
          name: "upheaval",
        },
      ],
      // 1146 × 600
      //   width: 800,
      //   height: 480,
    },
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/select/1", query: { inviteFid } }}
      >
        Go Swap
      </Button>,
      <Button
        action="link"
        target={`${TRADE_TOKEN_LEADERBOARD}?inviteFid=${inviteFid}`}
      >
        Leaderboard
      </Button>,
      <Button
        action="post"
        target={{ pathname: "/frames/share", query: { inviteFid } }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
