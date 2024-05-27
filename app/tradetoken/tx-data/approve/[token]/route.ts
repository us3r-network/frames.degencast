import { API_KEY_0X_API_KEY } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";
import {
  parseEther,
  erc20Abi,
  Abi,
  encodeFunctionData,
  getAbiItem,
  GetAbiItemParameters,
} from "viem";
import { base } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../../frames/frames";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const tokenAddress = ctx.searchParams.tokenAddress || "";
    let amount = message?.inputText || "";
    if (!tokenAddress || !amount) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Invalid request",
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    console.log("approve token", token, amount, tokenAddress);
    const baseUrl = `https://base.api.0x.org/swap/v1/quote?`;
    const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

    const querys = new URLSearchParams({
      buyToken: eth, // address
      sellToken: tokenAddress,
      sellAmount: parseEther(amount).toString(),
    }).toString();

    const res = await fetch(baseUrl + querys, {
      headers: { "0x-api-key": API_KEY_0X_API_KEY! },
    });

    const order = await res.json();

    const calldata = encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [order.to, parseEther(amount)],
    });
    console.log("calldata", calldata);

    const abiItem = getAbiItem({
      abi: erc20Abi,
      name: "approve",
      args: [order.to, parseEther(amount)],
    } as GetAbiItemParameters)!;

    console.log("abiItem", abiItem);
    return transaction({
      chainId: `eip155:${base.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: [abiItem],
        to: tokenAddress as `0x${string}`,
        data: calldata,
      },
    });
  })(req);
}
