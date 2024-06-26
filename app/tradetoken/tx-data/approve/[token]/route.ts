import { API_KEY_0X_API_KEY } from "@/lib/env";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { parseEther, erc20Abi, encodeFunctionData } from "viem";
import { base } from "viem/chains";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
): Promise<
  NextResponse<
    | TransactionTargetResponse
    | {
        errors: { reason: string; message: string }[];
      }
  >
> {
  const { token } = params;
  const { searchParams } = new URL(req.url);
  const tokenAddress = searchParams.get("tokenAddress") || "";
  const json = await req.json();
  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }
  let amount = frameMessage.inputText || "";
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

  return NextResponse.json({
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: erc20Abi,
      to: tokenAddress as `0x${string}`,
      data: calldata,
    },
  });
}
