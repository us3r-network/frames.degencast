import { NeynarCast } from "./createproposal/neynar-types";
import { AttentionTokenEntity } from "./createproposal/types/attention-token";
import { CommunityEntity } from "./createproposal/types/community";
import { ProposalEntity } from "./createproposal/types/proposal";
import { DEGENCAST_API } from "./env";

export enum ApiRespCode {
  SUCCESS = 0,
  ERROR = 1,
}
export type ApiResp<T> = {
  code: ApiRespCode;
  msg: string;
  data: T;
};

export async function getChannelInfo(channel: string): Promise<{
  msg: string;
  code: number;
  data: {
    name: string;
    shares: {
      subjectAddress: `0x${string}`;
    }[];
  };
}> {
  const resp = await fetch(`${DEGENCAST_API}/topics/channel?id=${channel}`);
  const data = await resp.json();
  //   console.log("getChannelInfo", { channel, data });
  return data;
}

export async function getAllowanceInfo(
  channel: string,
  fid: number
): Promise<{
  msg: string;
  code: number;
  data: {
    tipsKeyword: string;
    holding: number;
    rank: number;
    allowance: number;
    remaining: number;
    tipsReceived: number;
    shares: number;
  };
}> {
  const allowanceDataUrl = `${DEGENCAST_API}/topics/tip-allowance?fid=${fid}&channelId=${channel}`;
  // console.log({ allowanceDataUrl });
  const resp = await fetch(allowanceDataUrl);
  const data = await resp.json();
  // console.log("getAllowanceInfo", { channel, data });
  return data;
}

export async function joinWaitlist(
  fid: string | number
): Promise<ApiResp<any>> {
  const url = `${DEGENCAST_API}/topics/whitelists?fid=${fid}`;

  const resp = await fetch(url, {
    method: "post",
  });
  const data = await resp.json();
  return data;
}

export type CastDetailsData = {
  cast: NeynarCast;
  proposal: ProposalEntity;
  channel: CommunityEntity;
  tokenInfo: AttentionTokenEntity;
};
export async function getCastDetails(
  castHash: string
): Promise<ApiResp<CastDetailsData>> {
  const url = `${DEGENCAST_API}/topics/casts/${castHash}/detail`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
