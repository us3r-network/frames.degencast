import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AttentionTokenEntity } from "@/lib/createproposal/types/attention-token";
import { CommunityEntity } from "@/lib/createproposal/types/community";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function ChannelMetaInfo({
  channel,
  tokenInfo,
}: {
  channel: CommunityEntity;
  tokenInfo?: AttentionTokenEntity;
}) {
  const { name, logo } = channel;
  const progress = Number(tokenInfo?.progress?.replace("%", ""));
  const progressNumber = isNaN(progress) ? 0 : progress;
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex flex-row gap-1 items-center">
        <Avatar className="size-[24px]">
          <AvatarImage src={logo} />
          <AvatarFallback>
            <span className="text-sm font-bold">{name}</span>
          </AvatarFallback>
        </Avatar>
        <span className="line-clamp-1 font-bold leading-6 text-[#1E293B]">
          {name}
        </span>
      </div>
      <div>
        <span className="font-bold text-foreground">{progressNumber}%</span>
      </div>
    </div>
  );
}
