/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { ChannelTokenInfo } from "../../../utils/getChannelTokenInfo";
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
    const { paymentTokenAddress, ...channelTokenInfo } =
      ctx.searchParams as ChannelTokenInfo & {
        paymentTokenAddress: string;
      };

    if (!channelTokenInfo.danAddress) {
      return error("danAddress no support");
    }
    if (!paymentTokenAddress) {
      return error("paymentTokenAddress no support");
    }

    return {
      image: (
        <CastInfo
          castHash={hash}
          channelName={channelTokenInfo.channelName}
          channelId={channelTokenInfo.channelId}
          channelDescription={channelTokenInfo.channelDescription}
          launchProgress={channelTokenInfo.launchProgress}
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
            query: { price: input, paymentTokenAddress, ...channelTokenInfo },
          }}
          post_url={{
            pathname: `/frames/success`,
            query: { hash, ...channelTokenInfo },
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
