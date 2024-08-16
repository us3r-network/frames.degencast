/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import ProposalButton from "@/app/components/ProposalButton";
import ProposalDescription from "@/app/components/ProposalDescription";
import ProposalHr from "@/app/components/ProposalHr";
import React from "react";
import ProposalImageAndInfo from "./ProposalImageAndInfo";
import ProposalTint from "@/app/components/ProposalTint";

export default function CastInfo({
  castHash,
  state,
  channelName,
  channelId,
  channelDescription,
  launchProgress,
  promptText,
  btnText,
}: {
  castHash: string;
  state?: string;
  channelName?: string;
  channelId?: string;
  channelDescription?: string;
  launchProgress?: string;
  promptText?: string;
  btnText?: string;
}) {
  return (
    <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
      <ProposalImageAndInfo
        castHash={castHash}
        state={state}
        channelName={channelName}
        channelId={channelId}
        channelDescription={channelDescription}
        launchProgress={launchProgress}
      />
      <ProposalHr />
      <ProposalDescription />
      <ProposalHr />
      {promptText && <ProposalTint msg={promptText || "Upvote"} />}
      {btnText && <ProposalButton text={btnText} />}
    </div>
  );
}
