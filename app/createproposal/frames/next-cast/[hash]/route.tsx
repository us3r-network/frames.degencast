/* eslint-disable react/jsx-key */

import { frames } from "../../frames";
import { FRAMES_BASE_URL } from "@/lib/env";

const handleRequest = frames(async (ctx) => {
  const { hash } = ctx.searchParams as {
    hash: string;
  };
  const data = await fetch(
    `${FRAMES_BASE_URL}/proposal/frames?castHash=${hash}`
  );
  const text = await data.text();
  return new Response(text, {
    headers: { "content-type": "text/html" },
  });
});

export const GET = handleRequest;
export const POST = handleRequest;
