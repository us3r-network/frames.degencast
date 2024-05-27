import { DEGENCAST_API } from "./env";

export async function getTokenData() {
  const resp = await fetch(`${DEGENCAST_API}/topics/trade-infos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tokenData = await resp.json();
  return tokenData.data || [];
}

export async function getTokenInfoData(tokenId: string) {
  const url = `${DEGENCAST_API}/topics/trade-infos?channelId=${tokenId}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tokenData = await resp.json();
  return tokenData.data[0] || {};
}
