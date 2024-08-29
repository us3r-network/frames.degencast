/* eslint-disable react/jsx-key */
import { imageOptions } from "../frames";
import { Button } from "frames.js/next";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getPaymentToken,
  getProposals,
} from "@/lib/createproposal/proposal-helper";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import CastInfo from "../../components/CastInfo";
import { ChannelTokenInfo } from "./getChannelTokenInfo";

export const getProposeFrameConfig = async (
  hash: string,
  channelTokenInfo: ChannelTokenInfo
) => {
  const { danAddress, channelId, channelName, channelLogo } = channelTokenInfo;
  const proposals = await getProposals({
    contractAddress: danAddress as `0x${string}`,
    castHash: hash,
  });
  const isCreated = Number(proposals?.roundIndex) > 0;
  if (isCreated) {
    return {
      image: (
        <CastInfo
          castHash={hash}
          statusText="👍 Upvoted"
          channelName={channelName}
          channelLogo={channelLogo}
        />
      ),
      imageOptions,
      buttons: [
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
            `Use frame to vote the proposal`
          )}&embeds[]=${FRAMES_BASE_URL}/proposal/frames/vote?castHash=${hash}`}
        >
          Share Frame
        </Button>,
        <Button action="link" target={DEGENCAST_WEB_URL}>
          Open App
        </Button>,
      ],
    };
  }

  let paymentTokenAddress;
  try {
    paymentTokenAddress = await getPaymentToken({
      contractAddress: danAddress!,
    });
  } catch (error) {
    console.error("Error getting payment token", error);
  }

  const textInput = `The minimum amount: ${CREATE_PROPOSAL_MIN_PRICE}`;
  return {
    image: (
      <CastInfo
        castHash={hash}
        statusText="Voteable"
        channelName={channelName}
        channelLogo={channelLogo}
      />
    ),
    imageOptions,
    textInput,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/approve`,
          query: {
            paymentTokenAddress,
            danAddress,
          },
        }}
        post_url={{
          pathname: `/frames/success/approve/${hash}`,
          query: {
            danAddress,
            paymentTokenAddress,
            channelId,
          },
        }}
      >
        Upvote
      </Button>,
      <Button
        action="post"
        target={{
          pathname: `/frames/faq`,
          query: { hash, backPath: `/frames/propose/${hash}` },
        }}
      >
        FAQ
      </Button>,
      <Button action="link" target={DEGENCAST_WEB_URL}>
        Open App
      </Button>,
    ],
  };
};
