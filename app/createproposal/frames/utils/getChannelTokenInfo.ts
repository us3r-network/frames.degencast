import { getCommunityInfo } from "@/lib/createproposal/api";
import { Address } from "viem";

export type ChannelTokenInfo = {
  channelName: string;
  channelId: string;
  channelLogo: string;
  channelDescription: string;
  danAddress: Address;
  launchProgress: string;
};
export const getChannelTokenInfo = async (id: string) => {
  const communityInfo = await getCommunityInfo(id);
  const { channelId, attentionTokenInfo, name, description, logo } =
    communityInfo?.data || {};
  return {
    channelName: name,
    channelId: channelId || "",
    channelDescription: description,
    channelLogo: logo,
    danAddress: (attentionTokenInfo?.danContract || "") as Address,
    launchProgress: attentionTokenInfo?.progress || "",
  };
};
