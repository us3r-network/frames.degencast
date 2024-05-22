import {
  API_KEY_0X_API_KEY,
  BUY_TOKEN_PERCENTAGE_FEE,
  FEE_RECIPIENT_WALLET_ADDRESS,
} from "@/lib/env";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { parseEther, erc20Abi } from "viem";
import { base } from "viem/chains";

const ZERO_EX_ADDRESS = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
): Promise<NextResponse<TransactionTargetResponse>> {
  // const { token } = params;
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount") || "1000";
  console.log("sell token", params.token, amount);
  // TODO
  const token = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
  const json = await req.json();
  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  // let amount = frameMessage.inputText || "1000";

  console.log({ amount });
  const baseUrl = `https://base.api.0x.org/swap/v1/quote?`;
  const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const querys = new URLSearchParams({
    buyToken: eth, // address
    sellToken: token,
    sellAmount: parseEther(amount).toString(),
    feeRecipient: FEE_RECIPIENT_WALLET_ADDRESS!,
    buyTokenPercentageFee: BUY_TOKEN_PERCENTAGE_FEE!,
  }).toString();

  const res = await fetch(baseUrl + querys, {
    headers: { "0x-api-key": API_KEY_0X_API_KEY! },
  });

  const order = await res.json();

  console.log(order);

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
