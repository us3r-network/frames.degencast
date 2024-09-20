import { FRAMES_BASE_URL } from "./env";

export const getCastEntryFrameUrl = (
  castHash: string,
  channelId: string,
  authorFname: string
) => {
  const text = encodeURIComponent(
    `Propose to permanently archive on Arweave for @${authorFname} in /${channelId}`
  );
  const voteFrame = `${FRAMES_BASE_URL}/proposal/frames?castHash=${castHash}`;
  const warpcastCastUrl = `https://warpcast.com/~/conversations/${castHash}`;
  const addChannelKey = !!channelId && channelId !== "home";

  return `https://warpcast.com/~/compose?text=${text}&embeds[]=${voteFrame}${
    addChannelKey ? `&channelKey=${channelId}` : ""
  }`;
};
