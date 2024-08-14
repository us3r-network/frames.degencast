import { frames } from "../../frames/frames";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData, erc20Abi } from "viem";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getProposalPriceWithAmount,
} from "@/lib/createproposal/proposal-helper";
import { getTokenDetails } from "@/lib/createproposal/getTokenDetails";
import { AttTokenDan } from "@/lib/contract/att-token-dan";
import { transaction } from "frames.js/core";

export async function POST(req: NextRequest) {
  return await frames(async (ctx) => {
    const { message: frameMessage } = ctx;
    console.log("frameMessage", frameMessage);
    if (!frameMessage) {
      throw new Error("No frame message");
    }
    const value = Number(frameMessage.inputText || "");

    if (isNaN(value)) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Invalid value",
            },
          ],
        },
        {
          status: 500,
        }
      );
    }
    if (value < CREATE_PROPOSAL_MIN_PRICE) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: `The minimum amount: ${CREATE_PROPOSAL_MIN_PRICE}`,
            },
          ],
        },
        {
          status: 500,
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const paymentTokenAddress = searchParams.get("paymentTokenAddress") || "";
    const danAddress = searchParams.get("danAddress") || "";
    if (!danAddress) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Invalid danAddress",
            },
          ],
        },
        {
          status: 500,
        }
      );
    }

    let paymentTokenDetails;
    try {
      paymentTokenDetails = await getTokenDetails(
        paymentTokenAddress as `0x${string}`
      );
    } catch (error) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Invalid paymentTokenAddress",
            },
          ],
        },
        {
          status: 500,
        }
      );
    }
    const paymentPrice = getProposalPriceWithAmount(value, paymentTokenDetails);
    console.log("approve", {
      danAddress,
      paymentTokenDetails,
      paymentPrice,
    });

    const calldata = encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [danAddress as `0x${string}`, paymentPrice!],
    });

    return transaction({
      chainId: `eip155:${AttTokenDan.chain.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: erc20Abi as Abi,
        to: paymentTokenAddress as `0x${string}`,
        data: calldata,
      },
    });
  })(req);
}
