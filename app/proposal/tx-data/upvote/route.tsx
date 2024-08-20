import { error } from "frames.js/core";
import { parseEther, encodeFunctionData } from "viem";
import { base, baseSepolia } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";
import { DanContractABI } from "@/lib/proposal/dan";

export const POST = frames(async (ctx) => {
  const amount = ctx.message?.inputText || "";
  const danAddress = ctx.searchParams?.danAddress;
  const castHash = ctx.searchParams?.castHash;
  const queryAmount = ctx.searchParams?.amount;

  console.log("upvote", { amount, danAddress, castHash, queryAmount });

  if (!castHash) {
    return error("Cast Hash is required");
  }
  if (!danAddress) {
    return error("DanContract address is required");
  }
  if (!amount && !queryAmount) {
    return error("Amount is required");
  }
  const amountArg = amount || queryAmount;
  const calldata = encodeFunctionData({
    abi: DanContractABI,
    functionName: "proposeProposal",
    args: [castHash as `0x`, parseEther(amountArg)],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [
        {
          inputs: [
            { internalType: "string", name: "_contentHash", type: "string" },
            { internalType: "uint256", name: "_payment", type: "uint256" },
          ],
          name: "proposeProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      to: danAddress as `0x`,
      data: calldata,
    },
  });
});