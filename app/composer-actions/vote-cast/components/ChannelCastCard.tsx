import { NeynarCast } from "@/lib/createproposal/neynar-types";
import { AttentionTokenEntity } from "@/lib/createproposal/types/attention-token";
import { CommunityEntity } from "@/lib/createproposal/types/community";
import { ProposalEntity } from "@/lib/createproposal/types/proposal";
import { cn } from "@/lib/utils";
import React from "react";
import { ProposalStatus } from "./ProposalStatus";
import { ProposalButton } from "./ProposalButton";
import { Card } from "@/components/ui/card";
import { getCastImageUrl } from "../lib/cast";
import ChannelMetaInfo from "./ChannelMetaInfo";

type ChannelCastCardProps = {
  channel: CommunityEntity;
  tokenInfo: AttentionTokenEntity;
  cast: NeynarCast;
  proposal: ProposalEntity;
};
const ChannelCastCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChannelCastCardProps
>(({ channel, proposal, cast, tokenInfo, className }, ref) => {
  const { channelId } = channel || {};
  return (
    <Card
      className={cn(
        "box-border w-full flex-col gap-4 rounded-[16px] border-none p-4",
        className
      )}
      ref={ref}
    >
      <div>
        <ChannelMetaInfo channel={channel} tokenInfo={tokenInfo} />
      </div>
      <div className="mt-4">
        <img src={getCastImageUrl(cast.hash)} alt="" />
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <div>
          <ProposalStatus proposal={proposal} />
        </div>
        <div>
          <ProposalButton proposal={proposal} cast={cast} />
        </div>
      </div>
    </Card>
  );
});

export default ChannelCastCard;
