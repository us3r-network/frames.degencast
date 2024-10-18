"use client";

import { Button } from "@/components/ui/button";
import { getWarpcastConversationUrl } from "@/lib/cast";
import { NeynarCast, NeynarChannel } from "@/lib/createproposal/neynar-types";
import { ProposalEntity } from "@/lib/createproposal/types/proposal";
import { useMemo } from "react";
import getFrameUrlWithState, { getNftframe } from "../lib/getFrameUrlWithState";
import { Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createCastNft } from "../lib/api";
import { CommunityEntity } from "@/lib/createproposal/types/community";

export type ProposalButtonProps = {
  channel: CommunityEntity;
  cast: NeynarCast;
  proposal: ProposalEntity;
};
export function ProposalButton({
  proposal,
  cast,
  channel,
}: ProposalButtonProps) {
  const searchParams = useSearchParams();
  const frameMessage = searchParams?.get("frameMessage") || "";
  const { status, roundIndex, tokenId } = proposal;
  // const frameUrl = useMemo(() => {
  //   return getFrameUrlWithState(status, cast.hash);
  // }, [status, roundIndex, cast]);
  const castUrl = getWarpcastConversationUrl(cast.hash);

  // if (!frameUrl) {
  //   return null;
  // }
  const nftFrameUrl = getNftframe(cast.hash);
  const symbol =
    !channel?.channelId || channel.channelId === "home"
      ? "CAST"
      : channel.channelId.toUpperCase();
  return (
    <Button
      className="h-[32px] bg-[#9151C3] py-[6px] px-[8px] gap-2"
      onClick={(e) => {
        e.preventDefault();
        if (!tokenId && frameMessage) {
          createCastNft(cast.hash, frameMessage);
        }
        window.parent.postMessage(
          {
            type: "createCast",
            data: {
              cast: {
                text: `Mint for ${symbol}`,
                embeds: [nftFrameUrl, castUrl],
              },
            },
          },
          "*"
        );
      }}
    >
      <Upload className="text-white size-4" />
      <span className="text-xs">Pick</span>
    </Button>
  );
}
