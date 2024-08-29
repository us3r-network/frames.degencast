/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import CastInfo from "@/app/createproposal/components/CastInfo";
import { getChannelTokenInfo } from "../../../utils/getChannelTokenInfo";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const txId = message?.transactionId;
    const input = message?.inputText;
    const { danAddress, paymentTokenAddress, channelId } = ctx.searchParams as {
      danAddress: string;
      paymentTokenAddress: string;
      channelId?: string;
    };

    if (!danAddress) {
      return error("danAddress no support");
    }
    if (!paymentTokenAddress) {
      return error("paymentTokenAddress no support");
    }
    const channelTokenInfo = await getChannelTokenInfo(channelId!);
    const { channelName, channelLogo } = channelTokenInfo;
    return {
      image: (
        <CastInfo
          castHash={hash}
          title={`Approved Completed!`}
          statusText={"Voteable"}
          channelName={channelName}
          channelLogo={channelLogo}
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
              channelId,
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
