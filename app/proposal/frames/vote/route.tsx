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

const handleRequest = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const castHash = searchParams.get("castHash");
  const inviteFid = searchParams.get("inviteFid") || "";

  // const castInfoResp = await fetch(
  //   `${DEGENCAST_API}/topics/casts/${castHash}/proposal`
  // );
  // const castInfo = await castInfoResp.json();
  // console.log({ state: castInfo.data.state });

  /// have not proposal yet
  // if (!castInfo?.data.state) {
  //   const data = await fetch(
  //     `${FRAMES_BASE_URL}/another/frames?inviteFid=${inviteFid}&castHash=${castHash}`
  //   );
  //   const text = await data.text();
  //   return new Response(text, {
  //     headers: { "content-type": "text/html" },
  //   });
  // }

  // /// ready to mint
  // if (castInfo.data.state === 4) {
  //   const data = await fetch(
  //     `${FRAMES_BASE_URL}/another/frames?inviteFid=${inviteFid}&castHash=${castHash}`
  //   );
  //   const text = await data.text();
  //   return new Response(text, {
  //     headers: { "content-type": "text/html" },
  //   });
  // }

  return frames(async (ctx) => {
    const castDanAddr = "0x1234"; //castInfo?.data?.dan || "";
    if (!castDanAddr || !castHash) {
      throw error("Invalid castDanAddr");
    }

    return {
      image: (
        <div tw="bg-[#4C2896] flex flex-col  items-center w-full h-full p-[32px]">
          <ImageAndInfo castHash={castHash} />
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
          <ProposalChallenge amount="8,848" />

          <ProposalTint
            msg={
              "Downvote spam casts, if you win, you can share the staked funds from upvoters."
            }
          />

          <ProposalButton text="Downvote" />
        </div>
      ),
      imageOptions: imageOptions,
      textInput: `The minimum amount: XXXX`,
      buttons: [
        <Button
          action="post"
          target={{ pathname: "/frames/vote", query: { inviteFid, castHash } }}
        >
          refresh
        </Button>,
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/approve`,
            query: { inviteFid, danAddress: castDanAddr },
          }}
          post_url={{
            pathname: `/frames/upvote`,
            query: { inviteFid, danAddress: castDanAddr },
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
            pathname: `/frames/downvote`,
            query: { inviteFid, danAddress: castDanAddr },
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
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
