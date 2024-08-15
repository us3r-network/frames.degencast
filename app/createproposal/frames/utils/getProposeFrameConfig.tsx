/* eslint-disable react/jsx-key */
import { getCastImageUrl, getCommunityInfo } from "@/lib/createproposal/api";
import { Address } from "viem";
import ImageWrapper from "../../components/image-wrapper";
import { imageOptions } from "../frames";
import { Button } from "frames.js/next";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getPaymentToken,
  getProposals,
} from "@/lib/createproposal/proposal-helper";
import ImageContent from "../../components/image-content";
import { FRAMES_BASE_URL } from "@/lib/env";

export const getProposeFrameConfig = async (
  danAddress: Address,
  hash: string
) => {
  const castImageUrl = getCastImageUrl(hash);

  const proposals = await getProposals({
    contractAddress: danAddress as `0x${string}`,
    castHash: hash,
  });
  const isCreated = Number(proposals?.roundIndex) > 0;
  if (isCreated) {
    return {
      image: <ImageWrapper>Proposal already created</ImageWrapper>,
      imageOptions,
      buttons: [
        <Button
          action="post"
          target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
            `Use frame to vote the proposal`
          )}&embeds[]=${FRAMES_BASE_URL}/proposal/vote`}
        >
          Share Frame
        </Button>,
        <Button action="link" target={`https://dev.degencast.wtf`}>
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
      <ImageWrapper>
        <ImageContent castImgUrl={castImageUrl} />
      </ImageWrapper>
    ),
    imageOptions,
    textInput,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/approve`,
          query: { danAddress, paymentTokenAddress },
        }}
        post_url={{
          pathname: `/frames/success/approve/${hash}`,
          query: { danAddress, paymentTokenAddress },
        }}
      >
        Upvote
      </Button>,
      <Button action="link" target={`https://dev.degencast.wtf`}>
        Open App
      </Button>,
    ],
  };
};
