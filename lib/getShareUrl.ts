import { FRAMES_BASE_URL } from "./env";

export const getShareUrl = (
  castHash: string,
  channelId: string,
  authorFname: string
) => {
  return `https://warpcast.com/~/compose?text=${encodeURIComponent(
    `Propose to permanently archive on Arweave for @${authorFname} in /${channelId}`
  )}&embeds[]=${FRAMES_BASE_URL}/proposal/frames?castHash=${castHash}&embeds[]=https://warpcast.com/~/conversations/${castHash}${
    channelId && channelId !== "home" ? `&channelKey=${channelId}` : ""
  }`;
};
