import { Address } from "viem";
import { AttentionTokenEntity } from "./attention-token";

export type CommunityEntity = {
  id: number;
  name: string;
  logo: string;
  description: string;
  createdAt?: number;
  lastModifiedAt?: number;
  types: string[];
  apps?: Array<{
    logo: string;
    name: string;
    website: string;
  }>;
  tokens?: Array<{
    url: string;
    contract: string;
    tokenStandard: string;
  }>;
  nfts?: Array<{
    url: string;
    contract: string;
  }>;
  points?: Array<{
    url: string;
  }>;
  channels?: Array<{
    name: string;
    image: string;
    channel_id: string;
    parent_url: string;
  }>;
  channelId?: string;
  attentionTokenAddress: Address;
  attentionTokenInfo?: AttentionTokenEntity;
};

export type CommunityStatistics = {
  memberInfo: {
    totalNumber?: number;
    newPostNumber?: number;
    friendMemberNumber?: number;
  };
};

export type CommunityInfo = CommunityEntity & CommunityStatistics;

export type CommunityTypeEntity = {
  id: number;
  type: string;
  created_at: string;
  last_modified_at: string;
};
