import { getCastDetails } from "@/lib/api";
import {
  ApiRespCode,
  createCastNft,
  getActionPointConfig,
} from "@/lib/createproposal/api";
import { neynarValidateFrameMessage } from "@/lib/createproposal/neynar-api";
import { FRAMES_BASE_URL } from "@/lib/env";

// ADD_URL: "https://warpcast.com/~/add-cast-action?url=https://frame.degencast.wtf/cast-actions/like";

export async function GET(request: Request) {
  const actionConfig = {
    name: "Like for $CAST",
    icon: "thumbsup",
    description: "Like Casts to Earn $CAST.",
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
  if (!action?.cast?.hash) {
    return new Response(
      JSON.stringify({
        message: "Cast not found",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
  const castHash = action?.cast?.hash;

  try {
    const res = await createCastNft(castHash, messageBytes);
    const { code, msg } = res;
    if (code === ApiRespCode.SUCCESS) {
      const configRes = await getActionPointConfig();
      const voteCastUnit = configRes.data?.VoteCast?.unit || 1;
      return new Response(
        JSON.stringify({
          message: `Like successful, $CAST +${voteCastUnit}! Check your $CAST ranking at /degencast.`,
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: msg,
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    const res = await getCastDetails(castHash);
    const { code, msg, data } = res;
    if (code === ApiRespCode.SUCCESS) {
      const { proposal } = data || {};
      if (proposal?.tokenId) {
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
      return new Response(
        JSON.stringify({
          message: "Like failed",
        }),
        {
          status: 401,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: msg,
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
