import { DEGENCAST_API } from "./env";

export const getCastImageUrl = (castHash: string) => {
  return `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`;
};

export const getWarpcastConversationUrl = (castHash: string) => {
  return `https://warpcast.com/~/conversations/${castHash}`;
};
