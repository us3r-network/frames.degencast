/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import ProposalButton from "@/app/components/ProposalButton";
import ProposalDescription from "@/app/components/ProposalDescription";
import ProposalHr from "@/app/components/ProposalHr";
import React from "react";
import ProposalImageAndInfo from "./ProposalImageAndInfo";
import ProposalTint from "@/app/components/ProposalTint";
import UpvotedDescription from "./UpvotedDescription";

export default function CastInfo({
  castHash,
  state,
  channelName,
  channelId,
  channelDescription,
  launchProgress,
  promptText,
  btnText,
  successText,
  errorText,
  upvoted,
}: {
  castHash: string;
  state?: string;
  channelName?: string;
  channelId?: string;
  channelDescription?: string;
  launchProgress?: string;
  promptText?: string;
  btnText?: string;
  errorText?: string;
  successText?: string;
  upvoted?: boolean;
}) {
  return (
    <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
      {successText && (
        <>
          {" "}
          <div
            tw="text-white mt-[32px] flex justify-center items-center w-full text-[#00D1A7]"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            <div>{successText}</div>
          </div>
          <div tw="h-[12px]"></div>
        </>
      )}
      {errorText && (
        <>
          {" "}
          <div
            tw="text-white mt-[32px] flex justify-center items-center w-full text-[#F41F4C]"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            <div>{errorText}</div>
          </div>
          <div tw="h-[12px]"></div>
        </>
      )}
      <ProposalImageAndInfo
        castHash={castHash}
        state={state}
        channelName={channelName}
        channelId={channelId}
        channelDescription={channelDescription}
        launchProgress={launchProgress}
      />
      <ProposalHr />
      {upvoted ? <UpvotedDescription /> : <ProposalDescription />}
      {(promptText || btnText) && <ProposalHr />}

      {promptText && <ProposalTint msg={promptText} />}
      {btnText && <ProposalButton text={btnText} />}
    </div>
  );
}
