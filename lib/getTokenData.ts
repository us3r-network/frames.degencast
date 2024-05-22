export async function getTokenData() {
  const resp = await fetch(`https://api-dev.u3.xyz/topics/trade-infos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tokenData = await resp.json();
  return tokenData.data || [];
}

export async function getTokenInfoData(tokenId: string) {
  const resp = await fetch(
    `https://api-dev.u3.xyz/topics/trade-infos?channelId=${tokenId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const tokenData = await resp.json();
  return tokenData.data[0] || {};
}
