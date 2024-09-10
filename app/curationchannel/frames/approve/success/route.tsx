/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL, DEGENCAST_API } from "@/lib/env";

import {
  checkCurationHasGraduate,
  getCurationBalance,
  getMintPrice,
  getMintPriceFromUniswap,
} from "@/lib/proposal/helper";
import { formatEther } from "viem";
import { getExplorerUrlWithTx } from "@/app/createproposal/frames/utils/getExplorerUrlWithTx";
import DegencastTag from "@/app/components/DegencastTag";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const amount = ctx.message?.inputText || "1";
  const transactionId = ctx.message?.transactionId || "";
  const connectWallet = ctx.message?.connectedAddress || "";
  const channelId = ctx.searchParams?.channelId || "home";

  let tokenId;
  let castInfo;
  let communityCuration;
  let nftTokenUnit;
  let launchProgress;

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
  nftTokenUnit = castInfo?.data?.nftTokenUnit;
  launchProgress = castInfo?.data.launchProgress;
  if (!communityCuration) {
    throw error("address is required");
  }
  const castData = await getCastWithHash(castHash);

  console.log({
    inviteFid,
    castHash,
    tokenId,
    transactionId,
    amount,
    connectWallet,
  });

  let curationBalance;
  if (connectWallet) {
    curationBalance = await getCurationBalance(
      communityCuration,
      connectWallet as `0x`
    );
  }
  let mintPrice: bigint | undefined;
  const graduated = await checkCurationHasGraduate(communityCuration);

  if (graduated) {
    mintPrice = await getMintPriceFromUniswap(
      communityCuration,
      Number(amount)
    );
    mintPrice = (mintPrice * BigInt(11005)) / BigInt(10000);
  } else {
    mintPrice = await getMintPrice(communityCuration, Number(amount));
  }
  console.log({ mintPrice, curationBalance });

  return {
    image: (
      <div tw="bg-[#1a1a1a] flex flex-col  items-center w-full h-full px-[32px] py-[0px]">
        <div
          tw="text-white mt-[16px] flex justify-center items-center w-full text-[#fff]"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div tw="flex">Approve Completed!</div>
        </div>
        <div tw="flex relative w-[720px] h-[720px] mt-[16px]">
          <img
            src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
            alt=""
          />
          <DegencastTag
            tokenUint={nftTokenUnit || "100000"}
            progress={launchProgress}
            channelIcon={castData.channel?.image_url}
          />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    // textInput: `amount minimum 300`,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: graduated ? `/tx-data/graduatemint` : `/tx-data/mint`,
          query: {
            communityCuration,
            castHash,
            tokenId,
            amount,
            mintPrice: formatEther(mintPrice),
          },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { communityCuration, castHash, tokenId, channelId },
        }}
      >
        Mint
      </Button>,
      <Button action="link" target={`${getExplorerUrlWithTx(transactionId)}`}>
        View Tx
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}/casts/${castHash.slice(
          2
        )}?inviteFid=${inviteFid}`}
      >
        Cast
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}/communities/${channelId}?inviteFid=${inviteFid}`}
      >
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;