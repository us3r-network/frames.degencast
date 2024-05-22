/* eslint-disable react/jsx-key */
import { FRAMES_BASE_URL } from "@/lib/env";
import { frames, pixelFont } from "../../frames";
import { Button } from "frames.js/next";
import { NextRequest } from "next/server";
import SwapItem from "../../components/swap-item";
import { getTokenData } from "@/lib/getTokenData";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { page: string } }
) => {
  const page = Number(params.page);
  if (isNaN(page)) {
    throw new Error("Invalid page number");
  }

  const tokenData = await getTokenData();
  const position = (page - 1) * 2;
  const pageTokens = tokenData.slice(position, position + 2);
  const hasLeft = tokenData.length > page * 2;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const inviteFid = ctx.searchParams.inviteFid || "";

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
            {"Swap tokens".toUpperCase()}
          </div>
          <div
            tw="flex flex-row w-full justify-center items-center mt-[20px]"
            style={{
              gap: "20px",
            }}
          >
            {pageTokens.map((token: any) => {
              return (
                <SwapItem
                  title={token.id}
                  imageURL={token.imageURL}
                  value={1}
                  fdvUsd={Number(token.stats.fdv_usd)}
                  volumeUsd={Number(token.stats.volume_usd.h24)}
                  price={Number(token.stats.base_token_price_usd)}
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
      },
      buttons: [
        (page > 1 && (
          <Button
            action="post"
            target={{
              pathname: `/frames/select/${page - 1}`,
            }}
          >
            Back
          </Button>
        )) || (
          <Button action="post" target={`/frames`}>
            Back
          </Button>
        ),
        pageTokens.length > 0 && (
          <Button
            action="post"
            target={{
              pathname: `/frames/swap/${pageTokens[0].id}`,
              query: { page, inviteFid },
            }}
          >
            {pageTokens[0].name}
          </Button>
        ),
        pageTokens.length > 1 && (
          <Button
            action="post"
            target={{
              pathname: `/frames/swap/${pageTokens[1].id}`,
              query: { page, inviteFid },
            }}
          >
            {pageTokens[1].name}
          </Button>
        ),
        hasLeft && (
          <Button
            action="post"
            target={{
              pathname: `/frames/select/${page + 1}`,
              query: { inviteFid },
            }}
          >
            Next
          </Button>
        ),
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
