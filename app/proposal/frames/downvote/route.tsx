/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL } from "@/lib/env";

import ProposalImageAndInfo from "../../../components/ProposalImageAndInfo";
import ProposalDescription from "../../../components/ProposalDescription";
import ProposalHr from "../../../components/ProposalHr";
import ProposalChallenge from "../../../components/ProposalChallenge";
import ProposalButton from "../../../components/ProposalButton";
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
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px] py-[25px]">
        <div
          tw={`flex justify-between items-center mt-[16px] text-white w-[540px] text-[#F41F4C]`}
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          <div tw="flex">Cast Status:</div>
          <div tw="flex">{"Downvoted"}</div>
        </div>
        <img
          tw="w-[540px] h-[540px] mt-[16px]"
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <ProposalHr />
        <ProposalDescription />
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `amount minimum 300 $DEGEN`,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: `/frames/downvote`,
          query: {
            inviteFid,
            castHash,
            danAddress,
            launchProgress,
          },
        }}
      >
        Refresh
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/downvote`,
          query: { inviteFid, castHash, danAddress, amount: 300 },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, castHash, danAddress },
        }}
      >
        300 DEGEN
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/downvote`,
          query: { inviteFid, castHash, danAddress, amount: 8848 },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, castHash, danAddress },
        }}
      >
        8848 DEGEN
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
