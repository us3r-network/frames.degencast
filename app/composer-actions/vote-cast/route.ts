// ADD_URL: "https://warpcast.com/~/add-cast-action?url=https://frames.degencast.wtf/composer-actions/vote-cast";

import { neynarValidateFrameMessage } from "@/lib/createproposal/neynar-api";
import { FRAMES_BASE_URL } from "@/lib/env";

export async function GET(request: Request) {
  const actionConfig = {
    type: "composer",
    name: "Vote Cast",
    icon: "thumbsup",
    description: "Turn a cast into a Curation NFT.",
    aboutUrl: "https://github.com/us3r-network/degencast",
    imageUrl: "https://degencast.wtf/logo192.png",
    action: {
      type: "post",
    },
  };
  return new Response(JSON.stringify(actionConfig), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    trustedData: { messageBytes },
  } = body;
  const result = await neynarValidateFrameMessage(messageBytes);
  const { valid, action } = result;
  if (!valid) {
    return new Response(
      JSON.stringify({
        message: "Invalid message",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
  const fid = action?.interactor?.fid;
  return new Response(
    JSON.stringify({
      type: "form",
      title: "Vote Cast",
      url: `${FRAMES_BASE_URL}/composer-actions/vote-cast/casts?fid=${fid}`,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
