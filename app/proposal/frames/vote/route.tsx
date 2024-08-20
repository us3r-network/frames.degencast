/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { error } from "frames.js/core";
import { NextRequest } from "next/server";

import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import { frames, imageOptions } from "../frames";
import ImageAndInfo from "../../../components/ProposalImageAndInfo";
import Hr from "../../../components/ProposalHr";
import ProposalButton from "../../../components/ProposalButton";
import ProposalChallenge from "../../../components/ProposalChallenge";
import ProposalTint from "../../../components/ProposalTint";
import { getProposalState, ProposalState } from "@/lib/proposal/proposalState";
import {
  getApprovedAmount,
  getDisputePrice,
  getProposal,
  getProposePrice,
} from "@/lib/proposal/helper";
import { formatEther, parseEther } from "viem";

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
    throw error("Cast Proposal has Abandoned");
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

  const connectWallet = ctx.message?.connectedAddress as `0x${string}`;
  console.log({ castDanAddr, connectWallet });

  let needApprove = true;
  if (connectWallet) {
    const leftApprove = await getApprovedAmount(castDanAddr, connectWallet);
    if (leftApprove >= parseEther(challengePrice)) {
      needApprove = false;
    }
  }
  console.log({ needApprove });
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
          action="post"
          target={{
            pathname: "/frames/vote",
            query: { inviteFid, castHash },
          }}
        >
          Refresh
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
              type: "Upvote",
              castHash,
              currentStance,
            },
          }}
        >
          Upvote
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
          Downvote
        </Button>,
        <Button
          action="link"
          target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
        >
          Open App
        </Button>,
      ];
    }
    if (proposalRoundIndex % 2 === 0) {
      return [
        <Button
          action="post"
          target={{
            pathname: "/frames/vote",
            query: { inviteFid, castHash },
          }}
        >
          Refresh
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
              type: "Upvote",
              castHash,
              currentStance,
            },
          }}
        >
          Upvote
        </Button>,
        <Button
          action="link"
          target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
        >
          Open App
        </Button>,
      ];
    }
    return [
      <Button
        action="post"
        target={{
          pathname: "/frames/vote",
          query: { inviteFid, castHash },
        }}
      >
        Refresh
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
        Downvote
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        Open App
      </Button>,
    ];
  })();

  return {
    image: (
      <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
        <ImageAndInfo
          castHash={castHash}
          state={currentStance}
          launchProgress={launchProgress}
        />
        <Hr />

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
    buttons: buttons,
  };
});
//   })(req);
// };

export const GET = handleRequest;
export const POST = handleRequest;
