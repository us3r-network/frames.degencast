/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import { FRAMES_BASE_URL } from "@/lib/env";
import {
  getTokenDetails,
  TokenDetails,
} from "@/lib/createproposal/getTokenDetails";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getPaymentToken,
} from "@/lib/createproposal/proposal-helper";
import { Address } from "viem";
import { getCastImageUrl } from "@/lib/createproposal/api";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const requesterFid = message?.requesterFid!;
  const danAddress = (ctx.searchParams?.danAddress as Address) || "";
  const castHash = ctx.searchParams?.castHash || "";

  if (!danAddress || !castHash) {
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
          {!danAddress && !castHash
            ? "danAddress and castHash is required"
            : !danAddress
            ? "danAddress is required"
            : "castHash is required"}
        </div>
      ),
      imageOptions: imageOptions,
      buttons: [
        <Button action="link" target={`https://dev.degencast.wtf`}>
          Open App
        </Button>,
      ],
    };
  }
  const castImageUrl = getCastImageUrl(castHash);
  let paymentTokenAddress: Address | null = null;
  let paymentTokenDetails: TokenDetails | null = null;
  try {
    paymentTokenAddress = await getPaymentToken({
      contractAddress: danAddress,
    });
    paymentTokenDetails = await getTokenDetails(paymentTokenAddress);
  } catch (error: any) {
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
          {`
            paymentTokenAddress: ${paymentTokenAddress}.
            paymentTokenDetails: ${JSON.stringify(paymentTokenDetails)}.
            Error: ${error?.message}
            There was an error getting the payment token details.
            Please try again later.
          `}
        </div>
      ),
      imageOptions: imageOptions,
      buttons: [
        <Button
          action="post"
          target={{
            pathname: "/frames",
            query: { danAddress, castHash },
          }}
        >
          Refresh
        </Button>,
        <Button action="link" target={`https://dev.degencast.wtf`}>
          Open App
        </Button>,
      ],
    };
  }

  const textInput = `Minimum ${CREATE_PROPOSAL_MIN_PRICE} ${
    paymentTokenDetails?.symbol || "DEGEN"
  }...`;

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
        <img src={castImageUrl} alt="" tw="w-full " />
      </div>
    ),
    imageOptions: imageOptions,
    textInput: textInput,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/frames/create-proposal",
          query: { danAddress, castHash },
        }}
      >
        Upvote
      </Button>,
      <Button action="link" target={`https://dev.degencast.wtf`}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
