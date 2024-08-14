import { frames } from "../../../frames/frames";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { AttTokenDan } from "@/lib/contract/att-token-dan";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getTokenDetails } from "@/lib/createproposal/getTokenDetails";
import {
  getProposalPriceWithAmount,
  getProposals,
} from "@/lib/createproposal/proposal-helper";
import {
  ApiRespCode,
  checkCastProposalMetadata,
} from "@/lib/createproposal/api";
import { transaction } from "frames.js/core";

export async function POST(
  req: NextRequest,
  { params }: { params: { hash: string } }
) {
  const hash = params.hash;
  const { searchParams } = new URL(req.url);
  const danAddress = searchParams.get("danAddress") || "";
  const paymentTokenAddress = searchParams.get("paymentTokenAddress") || "";
  const inputPrice = searchParams.get("price") || "";

  return await frames(async (ctx) => {
    const { message: frameMessage } = ctx;
    if (!frameMessage) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "No frame message",
            },
          ],
        },
        {
          status: 400,
        }
      );
    }
    if (!danAddress || !paymentTokenAddress) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message:
                "Invalid request: danAddress or paymentTokenAddress is missing",
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    const requesterFid = frameMessage.requesterFid;
    const price = Number(inputPrice);
    if (isNaN(price)) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Invalid value",
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    const cast = await getCastWithHash(hash);

    const paymentTokenDetails = await getTokenDetails(
      paymentTokenAddress as `0x${string}`
    );

    const paymentPrice = getProposalPriceWithAmount(price, paymentTokenDetails);

    const arRes = await checkCastProposalMetadata(hash, requesterFid);
    const { data, code } = arRes;

    if (code !== ApiRespCode.SUCCESS || !data.arUrl) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Invalid metadata",
            },
          ],
        },
        {
          status: 500,
        }
      );
    }
    const { arUrl } = data;
    const config = {
      contentHash: hash,
      contentCreator: String(
        cast.author.verified_addresses.eth_addresses[0]
      ) as `0x${string}`,
      contentURI: arUrl,
    };

    let calldata;
    const funData = {
      abi: AttTokenDan.abi,
      functionName: "createProposal",
      args: [config, paymentPrice],
    };
    console.log("config", config);

    try {
      calldata = encodeFunctionData(funData);
      console.log("calldata", calldata);
    } catch (error: any) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Calldata",
              message: error.message,
            },
          ],
        },
        {
          status: 500,
        }
      );
    }

    const proposals = await getProposals({
      contractAddress: danAddress as `0x${string}`,
      castHash: hash,
    });
    const isCreated = Number(proposals?.roundIndex) > 0;
    if (isCreated) {
      return NextResponse.json(
        {
          errors: [
            {
              reason: "Invalid",
              message: "Proposal already created",
            },
          ],
        },
        {
          status: 500,
        }
      );
    }
    return transaction({
      chainId: `eip155:${AttTokenDan.chain.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: AttTokenDan.abi as Abi,
        to: danAddress as `0x${string}`,
        data: calldata,
      },
    });
  })(req);
}
