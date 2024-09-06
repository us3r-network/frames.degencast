import { error } from "frames.js/core";
import { parseEther, encodeFunctionData } from "viem";
import { base, baseSepolia } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";
import { CURATION_FACTORY_ADDRESS } from "../../../../lib/env";
import { FactoryContractABI } from "../../../../lib/proposal/factory";
import { getMintPrice } from "@/lib/proposal/helper";

export const POST = frames(async (ctx) => {
  const castHash = ctx.searchParams?.castHash;
  const communityCuration = ctx.searchParams?.communityCuration;
  const tokenId = ctx.searchParams?.tokenId;
  const amount = ctx.searchParams?.amount || "1";
  const mintPrice = ctx.searchParams?.mintPrice;

  console.log({ castHash, communityCuration, tokenId, amount, mintPrice });
  if (!castHash || !communityCuration || !tokenId || !amount || !mintPrice) {
    return error("Amount is required");
  }

  // const mintPrice = await getMintPrice(
  //   communityCuration as `0x`,
  //   Number(amount)
  // );
  console.log("mintPrice", mintPrice);

  const calldata = encodeFunctionData({
    abi: FactoryContractABI,
    functionName: "mintNFT",
    args: [
      communityCuration as `0x`,
      BigInt(tokenId),
      BigInt(amount),
      parseEther(mintPrice),
    ],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [
        {
          inputs: [
            { internalType: "address", name: "_tokenAddress", type: "address" },
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "uint256", name: "_maxPayment", type: "uint256" },
          ],
          name: "mintNFT",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      to: CURATION_FACTORY_ADDRESS as `0x`,
      data: calldata,
    },
  });
});
