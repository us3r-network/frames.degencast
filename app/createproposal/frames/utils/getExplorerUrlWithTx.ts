import { BASE_NETWORK } from "@/lib/env";

export const getExplorerUrlWithTx = (txHash: string) => {
  return BASE_NETWORK === "main"
    ? `https://base.blockscout.com/tx/${txHash}`
    : `https://base-sepolia.blockscout.com/tx/${txHash}`;
};
