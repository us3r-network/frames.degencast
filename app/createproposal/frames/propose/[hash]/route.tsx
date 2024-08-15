/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../../frames";
import { Address } from "viem";
import { getCastImageUrl, getCommunityInfo } from "@/lib/createproposal/api";
import ImageWrapper from "../../../components/image-wrapper";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { NextRequest } from "next/server";
import { getProposeFrameConfig } from "../../utils/getProposeFrameConfig";

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

    const castImageUrl = getCastImageUrl(hash);
    let danAddress: Address | "" = "";

    const communityInfo = await getCommunityInfo(channelId);
    danAddress = communityInfo?.data?.attentionTokenInfo?.danContract || "";
    if (!danAddress) {
      return {
        image: (
          <ImageWrapper>
            Channel token is not created!
            <br />
            To activate the curation token!
          </ImageWrapper>
        ),
        imageOptions: imageOptions,
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
    }

    return await getProposeFrameConfig(danAddress, hash);
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
