import { NEYNAR_API_KEY } from "../env";
import { NeynarCast } from "./neynar-types";

const NeynarApiHeaders = {
  "content-type": "application/json",
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

export const neynarValidateFrameMessage = async (messageBytes: any) => {
  const url = "https://api.neynar.com/v2/farcaster/frame/validate";
  const options = {
    method: "POST",

    headers: { accept: "application/json", ...NeynarApiHeaders },
    body: JSON.stringify({
      cast_reaction_context: true,
      follow_context: false,
      signer_context: false,
      channel_follow_context: true,
      message_bytes_in_hex: messageBytes,
    }),
  };

  const request = await fetch(url, options as any);
  const data = await request.json();
  return data;
};
