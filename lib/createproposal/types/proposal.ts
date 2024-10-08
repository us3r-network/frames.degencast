import { ProposalState } from "@/lib/proposal/proposalState";

export type ProposalEntity = {
  // 提案阶段状态
  status: ProposalState;
  // 决定当前结果的时间
  finalizeTime?: number;
  // 提案通过的cast,被mint过的数量
  mintedCount?: number;
  // mint 过期时间
  nftDeadline?: number;
  // tokenId
  tokenId?: number;
  // metadata URI
  tokenURI?: string;
  // 点赞数量
  upvoteCount?: number;
  // 点踩数量
  downvoteCount?: number;
  // 当前轮数
  roundIndex?: number;
};
