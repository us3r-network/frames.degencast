import { TriangleAlert } from "lucide-react";

export default function ComposerDescription() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <img
          className="w-[40px] h-[40px]"
          src={`https://degencast.wtf/logo512.png`}
        />
        <span className="text-white font-bold">Degencast</span>
      </div>
      <div className="flex flex-col gap-2 text-base font-medium text-white pl-2">
        <div className="w-full flex flex-row gap-2">
          <span className="leading-6">{"\u2022"}</span>
          <span>{`Upvote: Turn a cast into a Curation NFT.`}</span>
        </div>
        <div className="w-full flex flex-row gap-2">
          <span className="leading-6">{"\u2022"}</span>
          <span>{`Downvote: Reject the curation decision.`}</span>
        </div>
        <div className="w-full flex flex-row gap-2">
          <span className="leading-6">{"\u2022"}</span>
          <span>{`Result: Final stance after countdown.`}</span>
        </div>
        <div className="w-full flex flex-row gap-2">
          <span className="leading-6">{"\u2022"}</span>
          <span>{`Funds: Winner gets principal back, loser’s funds go to the winner based on weight.`}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <TriangleAlert className="text-white size-4" />
        <div className="text-white text-xs font-medium leading-tight">
          You can choose only one cast to share
        </div>
      </div>
    </div>
  );
}
