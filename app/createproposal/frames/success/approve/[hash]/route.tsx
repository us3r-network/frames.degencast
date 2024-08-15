/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { FRAMES_BASE_URL } from "@/lib/env";
import ImageWrapper from "@/app/createproposal/components/image-wrapper";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const txId = message?.transactionId;
    const input = message?.inputText;
    const danAddress = ctx.searchParams.danAddress || "";
    const paymentTokenAddress = ctx.searchParams.paymentTokenAddress || "";

    if (!danAddress) {
      return error("danAddress no support");
    }
    if (!paymentTokenAddress) {
      return error("paymentTokenAddress no support");
    }

    return {
      image: (
        <ImageWrapper>
          APPROVE SUCCESSFULLY!
          <br />
          <br />
          CONTINUE TO PROPOSE!
        </ImageWrapper>
      ),
      buttons: [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/propose/${hash}`,
            query: { price: input, danAddress, paymentTokenAddress },
          }}
          post_url={{
            pathname: `/frames/success`,
            query: { hash },
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
