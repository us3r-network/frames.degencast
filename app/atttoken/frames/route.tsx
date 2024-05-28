/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const attnft = ctx.searchParams?.attnft || "";
  const inviteFid = ctx.searchParams?.inviteFid || "";
  if (!attnft) {
    return {
      image: (
        <Container>
          <Title title={"invalid share"} />
        </Container>
      ),
      imageOptions: imageOptions,
    };
  }
  return {
    image: (
      <Container>
        <Title title={attnft.toUpperCase()} />
      </Container>
    ),
    imageOptions: imageOptions,
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/frames/shares", query: { attnft, inviteFid } }}
      >
        Buy shares
      </Button>,
      <Button
        action="post"
        target={{ pathname: "/frames/allowance", query: { attnft } }}
      >
        Allowance
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/share-more",
          query: { attnft, inviteFid },
        }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      tw="text-white w-full h-full flex flex-col"
      style={{
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('${FRAMES_BASE_URL}/images/atttoken/cover.png')`,
      }}
    >
      {children}
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div
      tw="w-full justify-center items-center flex flex-col uppercase"
      className="uppercase"
      style={{
        padding: "46px 56px 0 56px",
        fontSize: "56px",
      }}
    >
      {title}
    </div>
  );
}
