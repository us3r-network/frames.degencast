/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import CastInfo from "@/app/createproposal/components/CastInfo";
import { getChannelTokenInfo } from "../../utils/getChannelTokenInfo";

const handleRequest = async (
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
    const { channelName, channelDescription, launchProgress } =
      channelTokenInfo;
    return {
      image: (
        <CastInfo
          castHash={hash}
          channelName={channelName}
          channelId={channelId}
          channelDescription={channelDescription}
          launchProgress={launchProgress}
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

export const GET = handleRequest;
export const POST = handleRequest;
