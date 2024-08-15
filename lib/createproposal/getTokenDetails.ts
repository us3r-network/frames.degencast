import { Address, erc20Abi } from "viem";
import { ATT_TOKEN_CHAIN, publicClient } from "./proposal-helper";

export type TokenDetails = {
  name: string;
  symbol: string;
  decimals: number;
};
export async function getTokenDetails(contractAddress: Address) {
  const [name, symbol, decimals] = await Promise.all([
    publicClient.readContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: "name",
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: "symbol",
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: "decimals",
    }),
  ]);

  return { name, symbol, decimals };
}
