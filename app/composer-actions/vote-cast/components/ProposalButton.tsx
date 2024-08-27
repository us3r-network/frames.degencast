"use client";

import { Button } from "@/components/ui/button";
import { getWarpcastConversationUrl } from "@/lib/cast";
import { NeynarCast } from "@/lib/createproposal/neynar-types";
import { ProposalEntity } from "@/lib/createproposal/types/proposal";
import { useMemo } from "react";
import getFrameUrlWithState from "../lib/getFrameUrlWithState";

export type ProposalButtonProps = {
  cast: NeynarCast;
  proposal: ProposalEntity;
};
export function ProposalButton({ proposal, cast }: ProposalButtonProps) {
  const { status, roundIndex } = proposal;
  const frameUrl = useMemo(() => {
    return getFrameUrlWithState(status, cast.hash);
  }, [status, roundIndex, cast]);
  const castUrl = getWarpcastConversationUrl(cast.hash);

  if (!frameUrl) {
    return null;
  }
  return (
    <Button
      className="h-[32px] bg-[#9151C3] py-[6px] px-[8px]"
      onClick={(e) => {
        e.preventDefault();
        window.parent.postMessage(
          {
            type: "createCast",
            data: {
              cast: {
                text: "Use frame to vote the proposal",
                embeds: [frameUrl, castUrl],
              },
            },
          },
          "*"
        );
      }}
    >
      <span className="text-xs">Pick</span>
    </Button>
  );
}
