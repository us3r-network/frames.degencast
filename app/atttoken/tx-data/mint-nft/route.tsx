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
import { baseSepolia } from "viem/chains";
import { AttToken } from "../../../../lib/contract/att-token";

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
  if (isNaN(numShares)) {
    throw new Error("Invalid number of shares");
  }

  console.log("mint NFT", { attTokenAddress, attnft, numShares });
  const publicClient = createPublicClient({
    chain: baseSepolia,
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
    abi: AttToken.abi,
    functionName: "mintNFT",
    args: [numShares, attTokenPrice],
  });

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`, // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: AttToken.abi as Abi,
      to: attTokenAddress as `0x${string}`,
      data: calldata,
    },
  });
}
