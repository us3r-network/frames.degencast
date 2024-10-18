import { ApiResp } from "@/lib/createproposal/api";
import { NeynarCast } from "@/lib/createproposal/neynar-types";
import { AttentionTokenEntity } from "@/lib/createproposal/types/attention-token";
import { CommunityEntity } from "@/lib/createproposal/types/community";
import { ProposalEntity } from "@/lib/createproposal/types/proposal";
import { DEGENCAST_API } from "./env";
// import { DEGENCAST_API } from "@/lib/env";

export type ExploreCastFeeds = {
  limit?: number;
  cursor?: string;
  pageNumber?: number;
  fid?: string;
};
export type ExploreCastFeedsData = {
  casts: Array<{
    cast: NeynarCast;
    proposal: ProposalEntity;
    channel: CommunityEntity;
    tokenInfo: AttentionTokenEntity;
  }>;
  next: {
    cursor: string;
  };
};

export async function getExploreCastFeeds(
  params: ExploreCastFeeds
): Promise<ApiResp<ExploreCastFeedsData>> {
  let url = `${DEGENCAST_API}/topics/channels/feed/cast`;
  const searchParams = new URLSearchParams();
  if (params.fid) {
    searchParams.append("fid", params.fid);
  }
  if (params.limit) {
    searchParams.append("limit", String(params.limit));
  }
  if (params.cursor) {
    searchParams.append("cursor", params.cursor);
  }
  if (params.pageNumber) {
    searchParams.append("pageNumber", String(params.pageNumber));
  }
  url += "?" + searchParams.toString();
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
