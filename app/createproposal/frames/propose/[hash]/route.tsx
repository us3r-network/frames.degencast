/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import {
  getTokenDetails,
  TokenDetails,
} from "@/lib/createproposal/getTokenDetails";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getPaymentToken,
  getProposals,
} from "@/lib/createproposal/proposal-helper";
import { Address } from "viem";
import { getCastImageUrl, getCommunityInfo } from "@/lib/createproposal/api";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "";
  return await frames(async (ctx) => {
    const errorConfig = {
      image: <ImageWrapper>Error</ImageWrapper>,
      imageOptions: imageOptions,
      buttons: [
        <Button action="link" target={`https://dev.degencast.wtf`}>
          Open App
        </Button>,
      ],
    };
    if (!channelId) {
      return {
        ...errorConfig,
        image: <ImageWrapper>Curation only works in channels</ImageWrapper>,
      };
    }

    const castImageUrl = getCastImageUrl(hash);
    let danAddress: Address | "" = "";

    const communityInfo = await getCommunityInfo(channelId);
    danAddress = communityInfo?.data?.attentionTokenInfo?.danContract || "";
    if (!danAddress) {
      return {
        ...errorConfig,
        image: <ImageWrapper>channel token is not created</ImageWrapper>,
      };
    }

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

    let paymentTokenAddress: Address | "" = "";
    let paymentTokenDetails: TokenDetails | null = null;
    try {
      paymentTokenAddress = await getPaymentToken({
        contractAddress: danAddress!,
      });
      paymentTokenDetails = await getTokenDetails(paymentTokenAddress);
    } catch (error) {}

    const textInput = `Minimum ${CREATE_PROPOSAL_MIN_PRICE} ${
      paymentTokenDetails?.symbol || "DEGEN"
    }...`;
    return {
      image: (
        <ImageWrapper>
          <img src={castImageUrl} alt="" tw="h-full" />
        </ImageWrapper>
      ),
      imageOptions,
      textInput,
      buttons: [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/approve`,
            query: { danAddress },
          }}
          post_url={{
            pathname: `/frames/success/approve`,
            query: { danAddress },
          }}
        >
          Upvote
        </Button>,
        <Button action="link" target={`https://dev.degencast.wtf`}>
          Open App
        </Button>,
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
