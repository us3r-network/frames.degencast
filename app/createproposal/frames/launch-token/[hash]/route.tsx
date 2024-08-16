/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { createToken, getCommunityInfo } from "@/lib/createproposal/api";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import { getProposeFrameConfig } from "../../utils/getProposeFrameConfig";
import CastInfo from "@/app/createproposal/components/CastInfo";
import { getChannelTokenInfo } from "../../utils/getChannelTokenInfo";

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

    const buttons = [
      <Button
        action="post"
        target={{
          pathname: `/frames/launch-token/${hash}`,
        }}
      >
        Launch Curation Token
      </Button>,
      <Button action="link" target={`https://dev.degencast.wtf`}>
        Open App
      </Button>,
    ];
    return {
      image: (
        <CastInfo
          castHash={hash}
          channelName={channelTokenInfo.channelName}
          channelId={channelTokenInfo.channelId}
          launchProgress={channelTokenInfo.launchProgress}
          state="None"
          promptText="This channel hasn’t activated Curation Token yet. Please activate first."
        />
      ),
      imageOptions,
      buttons,
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
    const requesterFid = String(message?.requesterFid! || "");
    const attToken = await createToken(channelId, requesterFid);
    const danAddress = attToken?.data?.danContract;
    console.log("attToken", attToken);
    console.log("requesterFid", requesterFid);

    if (!danAddress) {
      return {
        image: (
          <ImageWrapper>
            There was an error creating the token.
            <br />
            <br />
            Please try again later.
          </ImageWrapper>
        ),
        imageOptions,
        buttons: [
          <Button
            action="post"
            target={{
              pathname: `/frames/launch-token/${hash}`,
            }}
          >
            Retry
          </Button>,
          <Button action="link" target={`https://dev.degencast.wtf`}>
            Open App
          </Button>,
        ],
      };
    }

    const channelTokenInfo = await getChannelTokenInfo(channelId);

    return await getProposeFrameConfig(hash, channelTokenInfo);
  })(req);
};

export const GET = handleGetRequest;
export const POST = handlePostRequest;
