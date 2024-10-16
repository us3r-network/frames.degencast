import { Address } from "viem";
import { DEGENCAST_API } from "../env";
import { CommunityEntity } from "./types/community";

export enum AsyncRequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}
export enum ApiRespCode {
  SUCCESS = 0,
  ERROR = 1,
}
export type ApiResp<T> = {
  code: ApiRespCode;
  msg: string;
  data: T;
};
export type ARUploadResult = {
  arUrl: string;
  arseedUrl: string;
  everHash: string;
  order: {
    itemId: string;
    size: number;
    bundler: string;
    currency: string;
    decimals: number;
    fee: string;
    paymentExpiredTime: number;
    expectedBlock: number;
    tag: string;
  };
};

export type AttentionTokenEntity = {
  name: string;
  logo: string;
  progress: string;
  price: number;
  priceTrend: string;
  marketCap: number;
  buy24h: number;
  sell24h: number;
  holders: number;
  tokenStandard: string;
  tokenContract: Address;
  danContract: Address;
  chain: string;
  bondingCurve: {
    basePrice: number;
  };
};

export function getCastImageUrl(castHash: string) {
  return `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`;
}

export async function checkCastProposalMetadata(
  castHash: string,
  fid: string | number
): Promise<ApiResp<ARUploadResult>> {
  const resp = await fetch(
    `${DEGENCAST_API}/arweave/check-cast-proposal-metadata-public/${castHash}?fid=${
      fid || ""
    }`
  );
  const data = await resp.json();
  return data;
}

export async function getCommunityInfo(
  id: string | number
): Promise<ApiResp<CommunityEntity>> {
  const url = `${DEGENCAST_API}/topics/channel?id=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

export async function createToken(
  channelId: string,
  fid: string
): Promise<ApiResp<AttentionTokenEntity>> {
  const url = `${DEGENCAST_API}/topics/channels/${channelId}/attention-tokens?fid=${fid}`;
  console.log("createToken", url);

  const resp = await fetch(url, {
    method: "post",
  });
  const data = await resp.json();
  return data;
}

export enum UserActionName {
  Share = "Share",
  View = "View",
  Like = "Like",
  UnLike = "UnLike",
  Tips = "Tips",
  ConnectFarcaster = "ConnectFarcaster",
  BuyChannelShare = "BuyChannelShare",
  Invite = "Invite",
  SwapToken = "SwapToken",
  MintCast = "MintCast",
  ViewChannel = "ViewChannel",
  VoteCast = "VoteCast",
  PostingSignature = "PostingSignature",
}

export type UserActionPointConfig = {
  [key in UserActionName]: {
    unit: number;
    dailyLimit?: number;
  };
};

export async function getActionPointConfig(): Promise<
  ApiResp<UserActionPointConfig>
> {
  const url = `${DEGENCAST_API}/topics/action-point-configs`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

export async function createCastNft(
  castHash: string,
  frameMessage: string
): Promise<ApiResp<AttentionTokenEntity>> {
  const url = `${DEGENCAST_API}/topics/proposals`;

  const resp = await fetch(url, {
    method: "post",
    body: JSON.stringify({
      castHash,
      frameMessage,
    }),
  });
  const data = await resp.json();
  return data;
}
