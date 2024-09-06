import { DEGENCAST_WEB_URL } from "./env";

export const getChannelRedirectUrl = (
  channelId: string,
  inviteFid?: string
) => {
  return `${DEGENCAST_WEB_URL}/communities/${channelId}${
    inviteFid ? `?inviteFid=${inviteFid}` : ""
  }`;
};

export const getCastRedirectUrl = (castHash: string, inviteFid?: string) => {
  return `${DEGENCAST_WEB_URL}/casts/${castHash}${
    inviteFid ? `?inviteFid=${inviteFid}` : ""
  }`;
};
