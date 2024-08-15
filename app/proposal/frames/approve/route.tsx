/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "../frames";
import { NextRequest } from "next/server";
import { error } from "frames.js/core";
import { DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";

import ProposalImageAndInfo from "../../../components/ProposalImageAndInfo";
import ProposalDescription from "../../../components/ProposalDescription";
import ProposalHr from "../../../components/ProposalHr";
import ProposalChallenge from "../../../components/ProposalChallenge";
import ProposalButton from "../../../components/ProposalButton";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";
  const type = ctx.searchParams?.type || "";

  return {
    image: (
      <div tw="bg-[#4C2896] flex flex-col items-center w-full h-full p-[32px]">
        <ProposalImageAndInfo castHash={castHash} state="TODO" />
        <ProposalHr />
        <ProposalDescription />
        <ProposalHr />
        <ProposalChallenge amount="8,848" />
        <ProposalButton text="Approve" />
      </div>
    ),
    imageOptions: imageOptions,
    textInput: `amount minimum 300 $DEGEN`,
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/approve`,
          query: {},
        }}
        post_url={{
          pathname: `/frames/success`,
          query: {},
        }}
      >
        Approve
      </Button>,
      <Button
        action="link"
        target={`${DEGENCAST_WEB_URL}?inviteFid=${inviteFid}`}
      >
        View Cast
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
