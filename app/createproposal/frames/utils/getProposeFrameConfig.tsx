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
import {
  getCastRedirectUrl,
  getChannelRedirectUrl,
} from "@/lib/getRedirectUrl";

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
    const data = await fetch(
      `${FRAMES_BASE_URL}/proposal/frames?castHash=${hash}`
    );
    const text = await data.text();
    return new Response(text, {
      headers: { "content-type": "text/html" },
    });
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
        Upvote (1/2)
      </Button>,
      <Button
        action="post"
        target={{
          pathname: `/frames/faq`,
          query: { hash, backPath: `/frames/propose/${hash}`, channelId },
        }}
      >
        FAQ
      </Button>,
      <Button action="link" target={getCastRedirectUrl(hash)}>
        View Cast
      </Button>,
      <Button action="link" target={getChannelRedirectUrl(channelId)}>
        Open App
      </Button>,
    ],
  };
};
