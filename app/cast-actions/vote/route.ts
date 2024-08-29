import { getChannelTokenInfo } from "@/app/createproposal/frames/utils/getChannelTokenInfo";
import {
  getCastWithHash,
  neynarValidateFrameMessage,
} from "@/lib/createproposal/neynar-api";
import {
  getProposals,
  ProposalState,
} from "@/lib/createproposal/proposal-helper";
import { FRAMES_BASE_URL } from "@/lib/env";

// ADD_URL: "https://warpcast.com/~/add-cast-action?url=https://frame.degencast.wtf/cast-actions/vote";

export async function GET(request: Request) {
  const actionConfig = {
    name: "Curate with DEGEN",
    icon: "thumbsup",
    description: "Turn a cast into a Curation NFT.",
    aboutUrl: "https://github.com/us3r-network/degencast",
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
  const castHash = action.cast.hash;

  // const cast = await getCastWithHash(castHash);
  const channelId = action.cast?.channel?.id || "home";
  if (!channelId) {
    return new Response(
      JSON.stringify({
        message: "Curation only works in channels",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
  const channelTokenInfo = await getChannelTokenInfo(channelId);
  const { danAddress } = channelTokenInfo;

  // create channel token
  if (!danAddress) {
    return new Response(
      JSON.stringify({
        type: "frame",
        frameUrl: `${FRAMES_BASE_URL}/createproposal/frames/launch-token-view/${castHash}`,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  const { roundIndex, state } = await getProposals({
    contractAddress: danAddress as `0x${string}`,
    castHash: castHash,
  });
  const notPropose = Number(roundIndex) === 0;

  // create proposal
  if (notPropose) {
    return new Response(
      JSON.stringify({
        type: "frame",
        frameUrl: `${FRAMES_BASE_URL}/createproposal/frames/propose/${castHash}`,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  // ready to mint
  if (state === ProposalState.ReadyToMint) {
    return new Response(
      JSON.stringify({
        type: "frame",
        frameUrl: `${FRAMES_BASE_URL}/curationnft/frames?castHash=${castHash}`,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  // Abandoned
  if (state === ProposalState.Abandoned) {
    return new Response(
      JSON.stringify({
        message: "Cast Proposal has Abandoned",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  // vote proposal
  return new Response(
    JSON.stringify({
      type: "frame",
      frameUrl: `${FRAMES_BASE_URL}/proposal/frames/vote?castHash=${castHash}`,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
