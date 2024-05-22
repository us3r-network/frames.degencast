/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { FRAMES_BASE_URL } from "@/lib/env";
import { frames, pixelFont } from "../../frames";
import { Button } from "frames.js/next";
import { NextRequest } from "next/server";
import SelectDialogItem from "../../components/select-dialog-item";
import Title from "../../components/title";
import { error } from "frames.js/core";
import { getAddressFromFid } from "@/lib/hub";
import { erc20Abi, formatEther } from "viem";
import { baseClient } from "@/lib/viem";
import { getTokenInfoData } from "@/lib/getTokenData";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { token: string } }
) => {
  const token = params.token;

  const tokenData = await getTokenInfoData(token);

  return await frames(async (ctx) => {
    const { message } = ctx;
    const requesterFid = message?.requesterFid!;
    const page = ctx.searchParams.page;
    const inviteFid = ctx.searchParams.inviteFid || "";
    if (!tokenData) {
      return error("Token no support");
    }
    const tokenAddress = tokenData.tokenAddress;
    const tokenName = tokenData.name;
    const tokenImage = tokenData.imageURL;
    const tokenMarketCap = tokenData.stats.market_cap_usd;
    const tokenPrice = tokenData.stats.token_price_usd;
    const tokenVolume24 = tokenData.stats.volume_usd.h24;
    const quote_token_price_base_token =
      tokenData.stats.quote_token_price_base_token;
    const quote_token_price_usd = tokenData.stats.quote_token_price_usd;
    const base_token_price_quote_token =
      tokenData.stats.base_token_price_quote_token;

    const { ethAddress } = await getAddressFromFid(requesterFid);
    const balance = await baseClient.readContract({
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "balanceOf",
      args: [ethAddress as `0x${string}`],
    });
    const balanceString = Number(formatEther(balance)).toFixed(2);

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
          <Title text={`Swap ${token}`.toUpperCase()} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              padding: "40px 80px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`${tokenImage}`}
              alt=""
              tw="w-40 h-40  rounded-full mr-6 mt-3"
              className="w-40"
            />
            <div
              style={{
                display: "flex",
                backgroundImage: `url(${FRAMES_BASE_URL}/images/swap-dialog.png)`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "690px",
                flexDirection: "column",
                height: "220px",
                padding: "15px 30px",
              }}
            >
              <SelectDialogItem
                title={`1 ${tokenName}`.toUpperCase()}
                value={`${base_token_price_quote_token} ETH`}
              />
              <SelectDialogItem
                title="1 ETH"
                value={`${quote_token_price_base_token}`}
              />
              <SelectDialogItem
                title="Your Balance"
                value={`${balanceString} ${tokenName}`}
              />
              <SelectDialogItem title="Transaction Fee" value={`0.3%`} />
            </div>
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
      textInput: `Input the token quantity here...`,
      buttons: [
        <Button action="post" target={`/frames/select/${page}`}>
          Back
        </Button>,
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/buy/${token}`,
            query: { inviteFid, tokenAddress },
          }}
          post_url={{ pathname: "/frames/success", query: { inviteFid } }}
        >
          Buy
        </Button>,
        <Button
          action="link"
          target={`https://dev.degencast.xyz?inviteFid=${inviteFid}`}
        >
          View More
        </Button>,
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
