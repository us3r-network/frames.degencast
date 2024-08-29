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
import { getChannelTokenInfo } from "../../utils/getChannelTokenInfo";
import { DEGENCAST_WEB_URL } from "@/lib/env";

const handleGetRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "home";
  return await frames(async (ctx) => {
    if (!channelId) {
      return {
        image: <ImageWrapper>Curation only works in channels</ImageWrapper>,
        imageOptions: imageOptions,
        buttons: [
          <Button action="link" target={DEGENCAST_WEB_URL}>
            Open App
          </Button>,
        ],
      };
    }
    const channelTokenInfo = await getChannelTokenInfo(channelId);
    const { danAddress, channelName, channelLogo } = channelTokenInfo;
    if (danAddress) {
      return await getProposeFrameConfig(hash, channelTokenInfo);
    }
    return {
      image: (
        <CastInfo
          castHash={hash}
          statusText={"Pending Activation"}
          channelName={channelName}
          channelLogo={channelLogo}
        />
      ),
      imageOptions,
      buttons: [
        <Button
          action="post"
          target={{
            pathname: `/frames/launch-token/${hash}`,
          }}
        >
          Activate
        </Button>,
        <Button
          action="post"
          target={{
            pathname: `/frames/faq`,
            query: { hash, backPath: `/frames/launch-token/${hash}` },
          }}
        >
          FAQ
        </Button>,
        <Button action="link" target={DEGENCAST_WEB_URL}>
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
  const channelId = cast?.channel?.id || "home";
  return await frames(async (ctx) => {
    const { message } = ctx;
    const requesterFid = String(message?.requesterFid! || "");
    const attToken = await createToken(channelId, requesterFid);
    const channelTokenInfo = await getChannelTokenInfo(channelId);
    const danAddress = attToken?.data?.danContract;
    const { channelName, channelLogo } = channelTokenInfo;
    if (!danAddress) {
      return {
        image: (
          <CastInfo
            castHash={hash}
            statusText={"Pending Activation"}
            channelName={channelName}
            channelLogo={channelLogo}
          />
        ),
        imageOptions,
        buttons: [
          <Button
            action="post"
            target={{
              pathname: `/frames/launch-token/${hash}`,
            }}
          >
            Try Again
          </Button>,
          <Button action="link" target={DEGENCAST_WEB_URL}>
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
