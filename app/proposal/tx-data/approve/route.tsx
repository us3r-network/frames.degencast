import { DEGEN_ADDRESS } from "@/lib/env";
import { error } from "frames.js/core";
import { parseEther, erc20Abi, encodeFunctionData } from "viem";
import { base, baseSepolia } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";
import { getTransactionChainId } from "@/lib/proposal/helper";
import { CREATE_PROPOSAL_MIN_PRICE } from "@/lib/createproposal/proposal-helper";

export const POST = frames(async (ctx) => {
  const amount = ctx.message?.inputText || `${CREATE_PROPOSAL_MIN_PRICE}`;
  const danAddress = ctx.searchParams?.danAddress;

  console.log("approve degen", amount, danAddress);

  if (!danAddress) {
    return error("DanContract address is required");
  }
  if (!amount) {
    return error("Amount is required");
  }

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [danAddress as `0x`, parseEther(amount)],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: getTransactionChainId(),
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: erc20Abi,
      to: DEGEN_ADDRESS,
      data: calldata,
    },
  });
});
