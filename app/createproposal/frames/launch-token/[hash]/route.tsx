/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { getTokenDetails } from "@/lib/createproposal/getTokenDetails";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getPaymentToken,
  getProposalPriceWithAmount,
} from "@/lib/createproposal/proposal-helper";
import { createToken, getCastImageUrl } from "@/lib/createproposal/api";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import ImageContent from "@/app/createproposal/components/image-content";

const handleGetRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "";
  const castImageUrl = getCastImageUrl(hash);
  return await frames(async (ctx) => {
    if (!channelId) {
      return {
        image: <ImageWrapper>Curation only works in channels</ImageWrapper>,
        imageOptions: imageOptions,
        buttons: [
          <Button action="link" target={`https://dev.degencast.wtf`}>
            Open App
          </Button>,
        ],
      };
    }
    const buttons = [
      <Button
        action="post"
        target={{
          pathname: `/frames/launch-token/${hash}`,
        }}
      >
        Launch Curation Token
      </Button>,
      <Button action="link" target={`https://dev.degencast.wtf`}>
        Open App
      </Button>,
    ];
    return {
      image: (
        <ImageWrapper>
          <ImageContent castImgUrl={castImageUrl} />
        </ImageWrapper>
      ),
      imageOptions,
      buttons,
    };
  })(req);
};

const handlePostRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "";
  const castImageUrl = getCastImageUrl(hash);
  return await frames(async (ctx) => {
    if (!channelId) {
      return {
        image: (
          <ImageWrapper>
            <ImageContent castImgUrl={castImageUrl} />
          </ImageWrapper>
        ),
        imageOptions: imageOptions,
        buttons: [
          <Button action="link" target={`https://dev.degencast.wtf`}>
            Open App
          </Button>,
        ],
      };
    }
    const { message } = ctx;
    const requesterFid = String(message?.requesterFid! || "");
    const attToken = await createToken(channelId, requesterFid);
    const danAddress = attToken?.data?.danContract;
    console.log("attToken", attToken);
    console.log("requesterFid", requesterFid);

    if (!danAddress) {
      return {
        image: (
          <ImageWrapper>
            There was an error creating the token.
            <br />
            Please try again later.
          </ImageWrapper>
        ),
        imageOptions,
        buttons: [
          <Button
            action="post"
            target={{
              pathname: `/frames/launch-token/${hash}`,
            }}
          >
            Retry
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
  })(req);
};

export const GET = handleGetRequest;
export const POST = handlePostRequest;
