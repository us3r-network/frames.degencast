/* eslint-disable react/jsx-key */

import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL, DEGENCAST_API } from "@/lib/env";

import ProposalImageAndMint from "../../../../components/ProposalImageAndMint";
import ProposalDescription from "../../../../components/ProposalDescription";
import ProposalHr from "../../../../components/ProposalHr";
import {
  checkCurationHasGraduate,
  getCurationBalance,
  getMintPrice,
  getMintPriceFromUniswap,
} from "@/lib/proposal/helper";
import { formatEther } from "viem";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getChannelTokenInfo } from "@/app/createproposal/frames/utils/getChannelTokenInfo";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const amount = ctx.message?.inputText || "1";
  const transactionId = ctx.message?.transactionId || "";
  const connectWallet = ctx.message?.connectedAddress || "";
  const cast = await getCastWithHash(castHash);
  const channelId = cast?.channel?.id || "";
  if (!channelId) {
    throw error("channelId is required");
  }
  const channelTokenInfo = await getChannelTokenInfo(channelId);
  const { channelName, channelDescription, launchProgress } = channelTokenInfo;
  let tokenId;
  let castInfo;
  let communityCuration;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/proposal`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }

  communityCuration = castInfo?.data.tokenAddr;
  tokenId = castInfo?.data.tokenId;
  if (!communityCuration) {
    throw error("address is required");
  }

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
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
        <div
          tw="text-white mt-[32px] flex justify-center items-center w-full text-[#00D1A7]"
          style={{
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div>Approve Completed!</div>
        </div>
        <div tw="h-[12px]"></div>
        <ProposalImageAndMint
          castHash={castHash}
          price={formatEther(mintPrice)}
          channelId={channelId}
          channelName={channelName}
          channelDescription={channelDescription}
        />
        <ProposalHr />
        <ProposalDescription />
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
          query: { communityCuration, castHash, tokenId },
        }}
      >
        Mint
      </Button>,
      <Button
        action="link"
        target={`https://base.blockscout.com/tx/${transactionId}`}
      >
        View Tx
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        View Cast
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
