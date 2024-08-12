import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { polygon } from "viem/chains";
import { AttToken } from "@/lib/contract/att-token";
import { PayToken } from "@/lib/contract/paytoken";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }
  const { searchParams } = new URL(req.url);
  const attnft = searchParams.get("attnft") || "";
  const attTokenAddress = searchParams.get("attTokenAddress") || "";
  const value = frameMessage.inputText!;
  const numShares = parseInt(value, 10);
  console.log("approve", { attTokenAddress, attnft, numShares });
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });

  const attToken = getContract({
    address: attTokenAddress as `0x${string}`,
    abi: AttToken.abi,
    client: publicClient,
  });

  const attTokenPrice = (await attToken.read.getMintNFTPrice([
    numShares,
  ])) as bigint;

  const calldata = encodeFunctionData({
    abi: PayToken.abi,
    functionName: "approve",
    args: [attTokenAddress as `0x${string}`, attTokenPrice],
  });

  return NextResponse.json({
    chainId: `eip155:${polygon.id}`, // Polygon Mainnet 137
    method: "eth_sendTransaction",
    params: {
      abi: PayToken.abi as Abi,
      to: PayToken.address as `0x${string}`,
      data: calldata,
    },
  });
}
