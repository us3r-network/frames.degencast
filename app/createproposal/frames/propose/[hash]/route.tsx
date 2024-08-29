/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import { getProposeFrameConfig } from "../../utils/getProposeFrameConfig";
import { getChannelTokenInfo } from "../../utils/getChannelTokenInfo";
import CastInfo from "@/app/createproposal/components/CastInfo";
import { DEGENCAST_WEB_URL } from "@/lib/env";

const handleRequest = async (
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
        imageOptions: imageOptions,
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
              query: { hash, backPath: `/frames/propose/${hash}` },
            }}
          >
            FAQ
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

export const GET = handleRequest;
export const POST = handleRequest;
