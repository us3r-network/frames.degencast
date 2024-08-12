import { DEGENCAST_API } from "../env";

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

export function getCastImageUrl(castHash: string) {
  return `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`;
}

export async function checkCastProposalMetadata(
  castHash: string,
  fid: string
): Promise<ApiResp<ARUploadResult>> {
  const resp = await fetch(
    `${DEGENCAST_API}/arweave/check-cast-proposal-metadata-public/${castHash}?fid=${
      fid || ""
    }`
  );
  const data = await resp.json();
  return data;
}
