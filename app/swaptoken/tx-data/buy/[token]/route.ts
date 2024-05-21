import {
  API_KEY_0X_API_KEY,
  BUY_TOKEN_PERCENTAGE_FEE,
  FEE_RECIPIENT_WALLET_ADDRESS,
} from "@/lib/env";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { parseEther } from "viem";
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
  const inviteFid = searchParams.get("inviteFid") || "";
  const tokenAddress = searchParams.get("tokenAddress") || "";

  const json = await req.json();
  const frameMessage = await getFrameMessage(json);

  if (!frameMessage || !tokenAddress) {
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

  let amount = frameMessage.inputText || "";

  if (!amount) {
    return NextResponse.json(
      {
        errors: [
          {
            reason: "amount",
            message: "Amount is required",
          },
        ],
      },
      {
        status: 400,
      }
    );
  }

  console.log({ amount });
  const baseUrl = `https://base.api.0x.org/swap/v1/quote?`;
  const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const querys = new URLSearchParams({
    buyToken: tokenAddress, // address
    sellToken: eth,
    buyAmount: parseEther(amount).toString(),
    feeRecipient: FEE_RECIPIENT_WALLET_ADDRESS!,
    buyTokenPercentageFee: BUY_TOKEN_PERCENTAGE_FEE!,
  }).toString();

  const res = await fetch(baseUrl + querys, {
    headers: { "0x-api-key": API_KEY_0X_API_KEY! },
  });

  const order = await res.json();

  return NextResponse.json({
    chainId: `eip155:${base.id}`, // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: order.to,
      data: order.data,
      value: order.value,
    },
  });
}
