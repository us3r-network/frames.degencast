/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../../../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { token: string } }
) => {
  const token = params.token;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const txId = message?.transactionId;
    const input = message?.inputText;
    const inviteFid = ctx.searchParams.inviteFid || "";
    const tokenAddress = ctx.searchParams.tokenAddress || "";

    if (!tokenAddress) {
      return error("Token no support");
    }

    return {
      image: `${FRAMES_BASE_URL}/images/success-approve.png`,
      buttons: [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/sell/${token}`,
            query: { inviteFid, amount: input, tokenAddress },
          }}
          post_url={{
            pathname: `/frames/success`,
            query: { inviteFid },
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
