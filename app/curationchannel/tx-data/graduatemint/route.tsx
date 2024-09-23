import { error } from "frames.js/core";
import { parseEther, encodeFunctionData } from "viem";
import { base, baseSepolia } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";
import { CURATION_FACTORY_ADDRESS } from "../../../../lib/env";
import { FactoryContractABI } from "../../../../lib/proposal/factory";
import { getMintPrice, getTransactionChainId } from "@/lib/proposal/helper";
import { ZERO_ADDRESS } from "@/lib/constants";

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

  console.log("mintPrice", mintPrice);

  const calldata = encodeFunctionData({
    abi: FactoryContractABI,
    functionName: "mintNFTFromUniV3",
    args: [
      communityCuration as `0x`,
      ZERO_ADDRESS,
      BigInt(tokenId),
      BigInt(amount),
      parseEther(mintPrice),
    ],
  });

  const abi = FactoryContractABI.filter(
    (item) => item.type === "function" && item.name === "mintNFTFromUniV3"
  );

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: getTransactionChainId(),
    method: "eth_sendTransaction",
    params: {
      abi: abi,
      to: CURATION_FACTORY_ADDRESS as `0x`,
      data: calldata,
    },
  });
});
