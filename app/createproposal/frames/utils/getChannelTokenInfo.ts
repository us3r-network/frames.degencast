import { getCommunityInfo } from "@/lib/createproposal/api";
import { Address } from "viem";

export type ChannelTokenInfo = {
  channelName: string;
  channelId: string;
  channelDescription: string;
  danAddress: Address;
  launchProgress: string;
};
export const getChannelTokenInfo = async (channelId: string) => {
  const communityInfo = await getCommunityInfo(channelId);
  const { attentionTokenInfo, name, description } = communityInfo?.data;
  return {
    channelName: name,
    channelId: channelId,
    channelDescription: description,
    danAddress: (attentionTokenInfo?.danContract || "") as Address,
    launchProgress: attentionTokenInfo?.progress || "",
  };
};
