import { error } from "frames.js/core";
import { parseEther, encodeFunctionData, Abi } from "viem";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";
import { DanContractABI } from "@/lib/proposal/dan";
import { getTransactionChainId } from "@/lib/proposal/helper";
import { ZERO_ADDRESS } from "@/lib/constants";
import { CREATE_PROPOSAL_MIN_PRICE } from "@/lib/createproposal/proposal-helper";

export const POST = frames(async (ctx) => {
  const amount = ctx.message?.inputText;
  const danAddress = ctx.searchParams?.danAddress;
  const castHash = ctx.searchParams?.castHash;
  const queryAmount = ctx.searchParams?.amount;
  const challengePrice = ctx.searchParams?.challengePrice;

  console.log("downvote", {
    amount,
    danAddress,
    castHash,
    queryAmount,
    challengePrice,
  });

  if (!castHash) {
    return error("Cast Hash is required");
  }
  if (!danAddress) {
    return error("DanContract address is required");
  }

  const amountArg =
    amount || challengePrice || queryAmount || `${CREATE_PROPOSAL_MIN_PRICE}`;

  const calldata = encodeFunctionData({
    abi: DanContractABI,
    functionName: "disputeProposal",
    args: [castHash as `0x`, parseEther(amountArg), ZERO_ADDRESS],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: getTransactionChainId(),
    method: "eth_sendTransaction",
    params: {
      abi: DanContractABI as Abi,
      to: danAddress as `0x`,
      data: calldata,
    },
  });
});
