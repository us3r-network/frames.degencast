/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { createToken } from "@/lib/createproposal/api";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import { getProposeFrameConfig } from "../../utils/getProposeFrameConfig";
import CastInfo from "@/app/createproposal/components/CastInfo";
import {
  ChannelTokenInfo,
  getChannelTokenInfo,
} from "../../utils/getChannelTokenInfo";

const handleGetRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "";
  return await frames(async (ctx) => {
    if (!channelId) {
      return {
        image: <ImageWrapper>Curation only works in channels</ImageWrapper>,
        imageOptions: imageOptions,
        buttons: [
          <Button action="link" target={`https://dev.degencast.wtf`}>
            Open App
          </Button>,
        ],
      };
    }
    const channelTokenInfo = await getChannelTokenInfo(channelId);
    const { danAddress } = channelTokenInfo;
    if (danAddress) {
      return await getProposeFrameConfig(hash, channelTokenInfo);
    }

    return {
      image: (
        <CastInfo
          castHash={hash}
          channelName={channelTokenInfo.channelName}
          channelId={channelTokenInfo.channelId}
          channelDescription={channelTokenInfo.channelDescription}
          launchProgress={channelTokenInfo.launchProgress}
          state="None"
          promptText="This channel hasn’t activated Curation Token yet. Please activate first."
        />
      ),
      imageOptions,
      buttons: [
        <Button
          action="post"
          target={{
            pathname: `/frames/launch-token/${hash}`,
            query: { ...channelTokenInfo },
          }}
        >
          Launch Curation Token
        </Button>,
        <Button action="link" target={`https://dev.degencast.wtf`}>
          Open App
        </Button>,
      ],
    };
  })(req);
};

const handlePostRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "";
  return await frames(async (ctx) => {
    const { message } = ctx;
    // const { ...channelTokenInfo } = ctx.searchParams as ChannelTokenInfo;
    // const channelId = channelTokenInfo.channelId;
    const requesterFid = String(message?.requesterFid! || "");
    const attToken = await createToken(channelId, requesterFid);
    const channelTokenInfo = await getChannelTokenInfo(channelId);
    const danAddress = attToken?.data?.danContract;
    if (!danAddress) {
      return {
        image: (
          <CastInfo
            castHash={hash}
            channelName={channelTokenInfo.channelName}
            channelId={channelTokenInfo.channelId}
            channelDescription={channelTokenInfo.channelDescription}
            launchProgress={channelTokenInfo.launchProgress}
            state="None"
            promptText="This channel hasn’t activated Curation Token yet. Please activate first."
          />
        ),
        imageOptions,
        buttons: [
          <Button
            action="post"
            target={{
              pathname: `/frames/launch-token/${hash}`,
              query: { ...channelTokenInfo },
            }}
          >
            Try Again
          </Button>,
          <Button action="link" target={`https://dev.degencast.wtf`}>
            Open App
          </Button>,
        ],
      };
    }

    return await getProposeFrameConfig(hash, channelTokenInfo);
  })(req);
};

export const GET = handleGetRequest;
export const POST = handlePostRequest;
