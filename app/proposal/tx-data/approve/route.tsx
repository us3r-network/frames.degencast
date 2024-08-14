import { DEGEN_ADDRESS } from "@/lib/env";
import { error } from "frames.js/core";
import { parseEther, erc20Abi, encodeFunctionData } from "viem";
import { base, baseSepolia } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";

export const POST = frames(async (ctx) => {
  const amount = ctx.message?.inputText || "";
  const danAddress = `0xcB0AA92278589ad38018E328936B0d178799a78c`;

  console.log("approve degen", amount, process.env.NODE_ENV);

  if (!amount) {
    return error("Amount is required");
  }

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [danAddress, parseEther(amount)],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${
      process.env.NODE_ENV === "development" ? baseSepolia.id : base.id
    }`,
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi,
      to: DEGEN_ADDRESS,
      data: calldata,
    },
  });
});
