/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { error } from "frames.js/core";
import { NextRequest } from "next/server";

import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import { frames, imageOptions } from "../frames";
import ProposalHr from "../../../components/ProposalHr";
import ProposalDescription from "../../../components/ProposalDescription";
import { getProposalState, ProposalState } from "@/lib/proposal/proposalState";
import {
  getApprovedAmount,
  getDisputePrice,
  getProposal,
  getProposePrice,
} from "@/lib/proposal/helper";
import { formatEther, parseEther } from "viem";
import DegencastTag2 from "@/app/components/DegencastTag2";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getChannelRedirectUrl } from "@/lib/getRedirectUrl";
import { getChannelIdWithCast } from "@/lib/getChannelIdWithCast";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  let castInfo;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/proposal`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  console.log("castInfo");
  console.log(castInfo);
  const castDataInfo = await getCastWithHash(castHash);
  const channelId = getChannelIdWithCast(castDataInfo);
  const castAuthor = castDataInfo?.author;
  const castChannel = castDataInfo?.channel;
  const launchProgress = castInfo?.data?.launchProgress || "0%";

  const castProposalState: number | undefined = castInfo?.data?.state;

  /// have not proposal yet
  if (castProposalState === undefined) {
    const data = await fetch(
      `${FRAMES_BASE_URL}/createproposal/frames/propose/${castHash}`
    );
    const text = await data.text();
    return new Response(text, {
      headers: { "content-type": "text/html" },
    });
  }

  /// ready to mint
  if (castInfo.data.state === ProposalState.ReadyToMint) {
    const data = await fetch(
      `${FRAMES_BASE_URL}/curationnft/frames?inviteFid=${inviteFid}&castHash=${castHash}`
    );
    const text = await data.text();
    return new Response(text, {
      headers: { "content-type": "text/html" },
    });
  }

  const castDanAddr = castInfo?.data?.dan || "";
  if (!castDanAddr || !castHash) {
    throw error("Invalid castDanAddr");
  }
  if (castProposalState === ProposalState.Abandoned) {
    throw error("Cast Proposal Has Abandoned");
  }

  const proposal = await getProposal(castDanAddr, castHash);
  const proposalRoundIndex = Number(proposal.roundIndex);
  let challengePrice = "0";
  if (proposalRoundIndex === 1) {
    // const proposePrice = await getProposePrice(castDanAddr, castHash);
    const disputePrice = await getDisputePrice(castDanAddr, castHash);
    challengePrice = formatEther(disputePrice);
  }
  if (proposalRoundIndex % 2 === 0) {
    const proposalPrice = await getProposePrice(castDanAddr, castHash);
    challengePrice = formatEther(proposalPrice);
  } else {
    const disputePrice = await getDisputePrice(castDanAddr, castHash);
    challengePrice = formatEther(disputePrice);
  }
  console.log({ challengePrice });

  const connectWallet = "0x4630CF0Fa55F83E11e43286fF04fc6930e1eB095"; //ctx.message?.connectedAddress as `0x${string}`;
  console.log({ castDanAddr, connectWallet });

  let needApprove = true;
  if (connectWallet) {
    const leftApprove = await getApprovedAmount(castDanAddr, connectWallet);
    if (leftApprove >= parseEther(challengePrice)) {
      needApprove = false;
    }
  }
  console.log({ needApprove, proposalRoundIndex });
  if (!needApprove) {
    if (proposalRoundIndex === 1) {
      const data = await fetch(
        `${FRAMES_BASE_URL}/proposal/frames/updownvote?inviteFid=${inviteFid}&castHash=${castHash}&danAddress=${castDanAddr}&launchProgress=${launchProgress}`
      );
      const text = await data.text();
      return new Response(text, {
        headers: { "content-type": "text/html" },
      });
    }
    if (proposalRoundIndex % 2 === 0) {
      const data = await fetch(
        `${FRAMES_BASE_URL}/proposal/frames/upvote?inviteFid=${inviteFid}&castHash=${castHash}&danAddress=${castDanAddr}&launchProgress=${launchProgress}`
      );
      const text = await data.text();
      return new Response(text, {
        headers: { "content-type": "text/html" },
      });
    }
    const data = await fetch(
      `${FRAMES_BASE_URL}/proposal/frames/downvote?inviteFid=${inviteFid}&castHash=${castHash}&danAddress=${castDanAddr}&launchProgress=${launchProgress}`
    );
    const text = await data.text();
    return new Response(text, {
      headers: { "content-type": "text/html" },
    });
  }

  const currentStance: string = getProposalState(proposal.state);

  const buttons = (function () {
    if (proposalRoundIndex === 1) {
      return [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/approve`,
            query: { inviteFid, danAddress: castDanAddr },
          }}
          post_url={{
            pathname: `/frames/approve/success`,
            query: {
              inviteFid,
              danAddress: castDanAddr,
              type: "Upvote",
              castHash,
              currentStance,
            },
          }}
        >
          Upvote👍
        </Button>,
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/approve`,
            query: { inviteFid, danAddress: castDanAddr },
          }}
          post_url={{
            pathname: `/frames/approve/success`,
            query: {
              inviteFid,
              danAddress: castDanAddr,
              type: "Downvote",
              castHash,
              currentStance,
            },
          }}
        >
          Challenge👎
        </Button>,
        <Button
          action="post"
          target={{
            pathname: "/frames/faq",
            query: { inviteFid, castHash, from: "/frames/vote" },
          }}
        >
          FAQ
        </Button>,
        <Button
          action="link"
          target={getChannelRedirectUrl(channelId, inviteFid)}
        >
          App
        </Button>,
      ];
    }
    if (proposalRoundIndex % 2 === 0) {
      return [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/approve`,
            query: { inviteFid, danAddress: castDanAddr },
          }}
          post_url={{
            pathname: `/frames/approve/success`,
            query: {
              inviteFid,
              danAddress: castDanAddr,
              type: "Upvote",
              castHash,
              currentStance,
            },
          }}
        >
          Upvote👍
        </Button>,
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/approve`,
            query: { inviteFid, danAddress: castDanAddr, challengePrice },
          }}
          post_url={{
            pathname: `/frames/approve/success`,
            query: {
              inviteFid,
              danAddress: castDanAddr,
              type: "Upvote",
              castHash,
              currentStance,
              challengePrice,
            },
          }}
        >
          Change Status
        </Button>,
        <Button
          action="post"
          target={{
            pathname: "/frames/faq",
            query: { inviteFid, castHash, from: "/frames/vote" },
          }}
        >
          FAQ
        </Button>,
        <Button action="link" target={getChannelRedirectUrl(channelId)}>
          App
        </Button>,
      ];
    }
    return [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/approve`,
          query: { inviteFid, danAddress: castDanAddr },
        }}
        post_url={{
          pathname: `/frames/approve/success`,
          query: {
            inviteFid,
            danAddress: castDanAddr,
            type: "Downvote",
            castHash,
            currentStance,
          },
        }}
      >
        Challenge👎
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/approve`,
          query: { inviteFid, danAddress: castDanAddr, challengePrice },
        }}
        post_url={{
          pathname: `/frames/approve/success`,
          query: {
            inviteFid,
            danAddress: castDanAddr,
            type: "Downvote",
            castHash,
            currentStance,
            challengePrice,
          },
        }}
      >
        Change Status
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/faq",
          query: { inviteFid, castHash, from: "/frames/vote" },
        }}
      >
        FAQ
      </Button>,
      <Button
        action="link"
        target={getChannelRedirectUrl(channelId, inviteFid)}
      >
        App
      </Button>,
    ];
  })();

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
            channelId={channelId}
          />
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `The minimum amount: 300`,
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
