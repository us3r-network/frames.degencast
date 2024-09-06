/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import CastInfo from "@/app/createproposal/components/CastInfo";
import { DEGENCAST_WEB_URL } from "@/lib/env";
import { getChannelTokenInfo } from "../../utils/getChannelTokenInfo";
import {
  getCastRedirectUrl,
  getChannelRedirectUrl,
} from "@/lib/getRedirectUrl";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  const hash = params.hash;
  const cast = await getCastWithHash(hash);
  const channelId = cast?.channel?.id || "home";
  return await frames(async (ctx) => {
    const channelTokenInfo = await getChannelTokenInfo(channelId);
    const { danAddress, channelName, channelLogo } = channelTokenInfo;
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
            query: {
              hash,
              backPath: `/frames/launch-token-view/${hash}`,
              channelId,
            },
          }}
        >
          FAQ
        </Button>,
        <Button action="link" target={getCastRedirectUrl(hash)}>
          View Cast
        </Button>,
        <Button action="link" target={getChannelRedirectUrl(channelId)}>
          Open App
        </Button>,
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
