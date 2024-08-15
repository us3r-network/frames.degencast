import { NEYNAR_API_KEY } from "../env";
import { NeynarCast } from "./neynar-types";

const NeynarApiHeaders = {
  "Content-Type": "application/json",
  api_key: NEYNAR_API_KEY,
} as HeadersInit;

export const getCastWithHash = async (hash: string) => {
  const url = `https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`;
  const request = await fetch(url, {
    method: "GET",
    headers: NeynarApiHeaders,
  });
  const data = await request.json();
  return data?.cast as NeynarCast;
};
