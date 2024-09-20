/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import CastInfo from "../../components/CastInfo";
import { getChannelTokenInfo } from "../utils/getChannelTokenInfo";
import { getCastEntryFrameUrl } from "@/lib/getShareUrl";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getChannelRedirectUrl } from "@/lib/getRedirectUrl";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const { hash, channelId } = ctx.searchParams as {
    hash: string;
    channelId: string;
  };
  const cast = await getCastWithHash(hash);
  const channelTokenInfo = await getChannelTokenInfo(channelId!);
  const { channelName, channelLogo } = channelTokenInfo;

  let nextCastHash = "";
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/frames/${hash}/nextcasthash`
    );
    const data = await castInfoResp.json();
    console.log("nextdata", data);
    nextCastHash = data?.data;
  } catch (err) {}
  return {
    image: (
      <CastInfo
        castHash={hash}
        title={`Transaction Completed!`}
        statusText={"👍 Upvoted"}
        channelName={channelName}
        channelLogo={channelLogo}
      />
    ),
    imageOptions,
    buttons: [
      ...(nextCastHash
        ? [
            <Button action="post" target={`/frames/next-cast/${nextCastHash}`}>
              Next cast
            </Button>,
          ]
        : []),
      <Button
        action="link"
        target={getCastEntryFrameUrl(
          hash,
          channelId,
          cast?.author?.username || ""
        )}
      >
        Share
      </Button>,
      <Button action="link" target={getChannelRedirectUrl(channelId)}>
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
