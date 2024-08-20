/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import CastInfo from "@/app/createproposal/components/CastInfo";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const txId = message?.transactionId;
    const input = message?.inputText;
    const {
      danAddress,
      paymentTokenAddress,
      channelName,
      channelId,
      channelDescription,
      launchProgress,
    } = ctx.searchParams as {
      danAddress: string;
      paymentTokenAddress: string;
      channelName: string;
      channelId: string;
      channelDescription: string;
      launchProgress: string;
    };

    if (!danAddress) {
      return error("danAddress no support");
    }
    if (!paymentTokenAddress) {
      return error("paymentTokenAddress no support");
    }

    return {
      image: (
        <CastInfo
          castHash={hash}
          channelName={channelName}
          channelId={channelId}
          channelDescription={channelDescription}
          launchProgress={launchProgress}
          state="None"
          successText="Approve Completed!"
        />
      ),
      imageOptions,
      buttons: [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/propose/${hash}`,
            query: { price: input, paymentTokenAddress, danAddress },
          }}
          post_url={{
            pathname: `/frames/success`,
            query: {
              hash,
              channelName,
              channelId,
              channelDescription,
              launchProgress,
            },
          }}
        >
          Next
        </Button>,
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
