export const FRAMES_BASE_URL = process.env.NEXT_PUBLIC_FRAMES_BASE_URL;
export const DEGENCAST_API = process.env.NEXT_PUBLIC_DEGENCAST_API;

export const FEE_RECIPIENT_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_FEE_RECIPIENT_WALLET_ADDRESS;
export const BUY_TOKEN_PERCENTAGE_FEE =
  process.env.NEXT_PUBLIC_BUY_TOKEN_PERCENTAGE_FEE;
export const API_KEY_0X_API_KEY = process.env.NEXT_PUBLIC_API_KEY_0X_API_KEY;

export const SWAPTOKEN_LEADERBOARD =
  process.env.NEXT_PUBLIC_SWAPTOKEN_LEADERBOARD || "https://dev.degencast.xyz";

export const DEGENCAST_WEB_URL =
  process.env.NEXT_PUBLIC_DEGENCAST_WEB_URL || "https://dev.degencast.wtf";

export const FARCASTER_HUB_URL = process.env.NEXT_PUBLIC_FARCASTER_HUB_URL;
export const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY || "";

export const TRADE_TOKEN_VIEWMORE =
  process.env.NEXT_PUBLIC_TRADE_TOKEN_VIEWMORE ||
  "https://dev.degencast.xyz/channels/tokens";
export const TRADE_TOKEN_LEADERBOARD =
  process.env.NEXT_PUBLIC_TRADE_TOKEN_LEADERBOARD ||
  "https://dev.degencast.xyz/channels/tokens";

export const BASE_NETWORK = process.env.NEXT_PUBLIC_BASE_NETWORK || "sepolia";
export const DEGEN_ADDRESS: `0x${string}` = process.env
  .NEXT_PUBLIC_DEGEN_ADDRESS as `0x${string}`;
export const CURATION_FACTORY_ADDRESS: `0x${string}` = process.env
  .NEXT_PUBLIC_CURATION_FACTORY_ADDRESS as `0x${string}`;
export const UNISWAP_QUOTEV2_ADDRESS: `0x${string}` = process.env
  .NEXT_PUBLIC_UNISWAP_QUOTEV2_ADDRESS as `0x${string}`;
