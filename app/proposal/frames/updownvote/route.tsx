/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import ProposalImageAndInfo from "../../../components/ProposalImageAndInfo";
import ProposalDescription from "../../../components/ProposalDescription";
import ProposalHr from "../../../components/ProposalHr";
import ProposalChallenge from "../../../components/ProposalChallenge";
import ProposalButton from "../../../components/ProposalButton";
import ProposalTint from "../../../components/ProposalTint";
import {
  getDisputePrice,
  getProposal,
  getProposePrice,
} from "@/lib/proposal/helper";
import { getProposalState } from "@/lib/proposal/proposalState";
import { formatEther } from "viem";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const danAddress = ctx.searchParams?.danAddress! as `0x`;
  const castHash = ctx.searchParams?.castHash! as `0x`;
  const launchProgress = ctx.searchParams?.launchProgress || "0%";

  const proposal = await getProposal(danAddress, castHash);
  const currentStance = getProposalState(proposal.state);
  const proposalRoundIndex = Number(proposal.roundIndex);
  let challengePrice = "0";
  if (proposalRoundIndex === 1) {
    const disputePrice = await getDisputePrice(danAddress, castHash);
    challengePrice = formatEther(disputePrice);
  }
  if (proposalRoundIndex % 2 === 0) {
    const proposalPrice = await getProposePrice(danAddress, castHash);
    challengePrice = formatEther(proposalPrice);
  } else {
    const disputePrice = await getDisputePrice(danAddress, castHash);
    challengePrice = formatEther(disputePrice);
  }
  console.log({ challengePrice });

  return {
    image: (
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
        <ProposalImageAndInfo
          castHash={castHash}
          state={currentStance}
          launchProgress={launchProgress}
        />
        <ProposalHr />

        <ProposalTint
          msg={"Upvote and earn minting fee rewards upon success!"}
        />

        <ProposalButton text="Upvote & Accelerate Countdown" />
        <div
          tw="text-[#fff] mt-[16px] flex justify-center items-center w-full"
          style={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "24px",
          }}
        >
          or
        </div>
        <ProposalChallenge amount={challengePrice} />

        <ProposalTint
          msg={
            "Downvote spam casts, if you win, you can share the staked funds from upvoters."
          }
        />

        <ProposalButton text="Downvote" />
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `The minimum amount: 300`,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: `/frames/updownvote`,
          query: { inviteFid, castHash },
        }}
      >
        Refresh
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/upvote`,
          query: { inviteFid, castHash, danAddress },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, castHash, danAddress },
        }}
      >
        Upvote
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/downvote`,
          query: { inviteFid, castHash, danAddress },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, castHash, danAddress },
        }}
      >
        Downvote
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        Open App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
