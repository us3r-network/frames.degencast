import { createPublicClient, http, PublicClient } from "viem";
import { AttTokenDan } from "../contract/att-token-dan";
import { TokenDetails } from "./getTokenDetails";

export const ATT_TOKEN_CHAIN = AttTokenDan.chain;
export const publicClient = createPublicClient({
  chain: ATT_TOKEN_CHAIN,
  transport: http(),
});
export const CREATE_PROPOSAL_MIN_PRICE = 300;
export const getProposalMinPrice = (paymentTokenInfo: TokenDetails) => {
  if (!paymentTokenInfo?.decimals) {
    return undefined;
  }
  return BigInt(
    `${CREATE_PROPOSAL_MIN_PRICE}${"0".repeat(paymentTokenInfo?.decimals!)}`
  );
};
export const getProposalPriceWithAmount = (
  price: number,
  paymentTokenInfo: TokenDetails
) => {
  if (!paymentTokenInfo?.decimals) {
    return undefined;
  }
  const priceBigInt = BigInt(price * 10 ** paymentTokenInfo?.decimals);
  return priceBigInt;
};

export enum ProposalState {
  NotProposed = -1,
  Proposed = 0,
  Accepted = 1,
  Disputed = 2,
  ReadyToMint = 3,
  Abandoned = 4,
}
export type ProposalsInfo = {
  currentKey: string;
  uuid: string;
  contentHash: string;
  contentURI: string;
  contentCreator: `0x${string}`;
  proposeWeight: bigint;
  disputeWeight: bigint;
  deadline: bigint;
  roundIndex: bigint;
  state: ProposalState;
};
export const getProposals = async ({
  contractAddress,
  castHash,
}: {
  contractAddress: `0x${string}`;
  castHash: string;
}) => {
  if (!contractAddress) {
    throw new Error("Contract address is required");
  }
  if (!castHash) {
    throw new Error("Cast hash is required");
  }
  const proposals = (await publicClient.readContract({
    abi: AttTokenDan.abi,
    address: contractAddress,
    functionName: "proposals",
    args: [castHash],
  })) as Array<any>;

  const [
    currentKey,
    uuid,
    contentHash,
    contentURI,
    contentCreator,
    proposeWeight,
    disputeWeight,
    deadline,
    roundIndex,
    state,
  ] = proposals;
  return {
    currentKey,
    uuid,
    contentHash,
    contentURI,
    contentCreator,
    proposeWeight,
    disputeWeight,
    deadline,
    roundIndex,
    state,
  } as ProposalsInfo;
};

export const getRound = async ({
  contractAddress,
  castHash,
  roundIndex,
  walletAddress,
}: {
  publicClient: PublicClient;
  contractAddress: `0x${string}`;
  castHash: string;
  roundIndex: bigint;
  walletAddress: `0x${string}`;
}) => {
  if (!contractAddress) {
    throw new Error("Contract address is required");
  }
  if (!castHash) {
    throw new Error("Cast hash is required");
  }
  if (roundIndex === undefined) {
    throw new Error("Round index is required");
  }
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  const round = (await publicClient.readContract({
    abi: AttTokenDan.abi,
    address: contractAddress,
    functionName: "round",
    args: [castHash, roundIndex, walletAddress],
  })) as boolean;

  return round;
};

export const getPaymentToken = async ({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) => {
  if (!contractAddress) {
    throw new Error("Contract address is required");
  }
  const paymentToken = await publicClient.readContract({
    abi: AttTokenDan.abi,
    address: contractAddress,
    functionName: "paymentToken",
  });
  return paymentToken as `0x${string}`;
};
