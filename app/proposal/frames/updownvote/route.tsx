/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

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
import DegencastTag2 from "@/app/components/DegencastTag2";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getChannelRedirectUrl } from "@/lib/getRedirectUrl";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const danAddress = ctx.searchParams?.danAddress! as `0x`;
  const castHash = ctx.searchParams?.castHash! as `0x`;
  const castDataInfo = await getCastWithHash(castHash);

  const castAuthor = castDataInfo?.author;
  const castChannel = castDataInfo?.channel;

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
      <div tw="bg-[#1a1a1a] flex flex-row  items-center w-full h-full px-[77px] py-[90px]">
        <img
          tw="w-[720px] h-[720px] "
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <div
          tw={`flex flex-col justify-between items-center mt-[16px] h-full text-white w-[687px] ml-[40px] relative`}
        >
          <div tw="flex flex-col w-full">
            <span
              style={{
                color: "#FFF",
                fontSize: "96px",
                fontWeight: 700,
                lineHeight: "120px",
              }}
            >
              Cast Detail
            </span>
            <div
              tw="flex flex-col mt-[30px]"
              style={{
                color: "#9BA1AD",
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "36px",
              }}
            >
              <p tw="p-0 m-0">
                Risk DEGEN to vote and get rewarded for every mint.
              </p>
              <p tw="p-0 m-0">Permanently stored on Arweave.</p>
            </div>
            <div
              tw="flex items-center justify-between mt-[30px]"
              style={{
                color: "#FFF",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "50px",
              }}
            >
              <span>Channel</span>
              <div tw="flex">
                <img
                  src={`${FRAMES_BASE_URL}/images/degenicon.png`}
                  tw="w-[40px] h-[40px] mr-[8px]"
                />
                <span>$DEGEN</span>
              </div>
            </div>
            <div
              tw="flex items-center justify-between mt-[30px]"
              style={{
                color: "#FFF",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "50px",
              }}
            >
              <span>Cast Status</span>
              <span>{currentStance}</span>
            </div>
            <div
              tw="flex items-center justify-between mt-[30px]"
              style={{
                color: "#FFF",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "50px",
              }}
            >
              <span>Vote Staking</span>
              <span>300 DEGEN</span>
            </div>
          </div>
          <DegencastTag2
            username={castAuthor.username}
            pfp_url={castAuthor.pfp_url}
            channelId={castChannel?.id}
          />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `The minimum amount: 300`,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/upvote`,
          query: { inviteFid, castHash, danAddress, challengePrice },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, castHash, danAddress, challengePrice },
        }}
      >
        Upvote👍
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/downvote`,
          query: { inviteFid, castHash, danAddress, challengePrice },
        }}
        post_url={{
          pathname: `/frames/success`,
          query: { inviteFid, castHash, danAddress, challengePrice },
        }}
      >
        Challenge👎
      </Button>,
      <Button
        action="post"
        target={{
          pathname: `/frames/faq`,
          query: {
            inviteFid,
            castHash,
            from: "/frames/updownvote",
            danAddress,
          },
        }}
      >
        FAQ
      </Button>,
      <Button
        action="link"
        target={getChannelRedirectUrl(castChannel?.id || "home", inviteFid)}
      >
        App
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
