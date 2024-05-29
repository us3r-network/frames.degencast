/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions, pixelFont } from "./frames";
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
      imageOptions: imageOptions,
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
          padding: "35px 120px",
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
          {"TOP 3 Shares"}
        </div>
        <div
          tw="flex flex-col w-full mt-[15px]"
          style={{
            gap: "5px",
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
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/select", query: { inviteFid, page: 1 } }}
      >
        Buy Shares
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
