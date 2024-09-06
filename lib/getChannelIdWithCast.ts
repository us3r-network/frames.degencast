import { NeynarCast } from "./createproposal/neynar-types";

export const getChannelIdWithCast = (cast: NeynarCast) => {
  const { channel, root_parent_url } = cast || {};
  if (channel) {
    return channel.id;
  }
  if (root_parent_url && root_parent_url.includes("channel/")) {
    return root_parent_url.split("channel/").pop();
  }
  return "home";
};
