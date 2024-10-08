import { frames } from "../../../frames/frames";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { AttTokenDan } from "@/lib/contract/att-token-dan";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { getTokenDetails } from "@/lib/createproposal/getTokenDetails";
import {
  CREATE_PROPOSAL_MIN_PRICE,
  getProposalPriceWithAmount,
  getProposals,
} from "@/lib/createproposal/proposal-helper";
import {
  ApiRespCode,
  checkCastProposalMetadata,
} from "@/lib/createproposal/api";
import { error, transaction } from "frames.js/core";
import { ZERO_ADDRESS } from "@/lib/constants";

export async function POST(
  req: NextRequest,
  { params }: { params: { hash: string } }
) {
  const hash = params.hash;
  const { searchParams } = new URL(req.url);
  const danAddress = searchParams.get("danAddress") || "";
  const paymentTokenAddress = searchParams.get("paymentTokenAddress") || "";
  const inputPrice = searchParams.get("price") || CREATE_PROPOSAL_MIN_PRICE;

  return await frames(async (ctx) => {
    const { message: frameMessage } = ctx;
    if (!frameMessage) {
      return error("Invalid frame message");
    }
    if (!danAddress || !paymentTokenAddress) {
      return error(
        "Invalid request: danAddress or paymentTokenAddress is missing"
      );
    }

    const requesterFid = frameMessage.requesterFid;
    const price = Number(inputPrice);
    if (isNaN(price)) {
      return error("Amount is required");
    }

    const cast = await getCastWithHash(hash);

    const paymentTokenDetails = await getTokenDetails(
      paymentTokenAddress as `0x${string}`
    );

    const paymentPrice = getProposalPriceWithAmount(price, paymentTokenDetails);

    const arRes = await checkCastProposalMetadata(hash, requesterFid);
    const { data, code } = arRes;

    if (code !== ApiRespCode.SUCCESS || !data.arUrl) {
      return error("Invalid proposal metadata");
    }
    const { arUrl } = data;
    const contentCreator = String(
      cast.author.verified_addresses.eth_addresses[0] ||
        cast.author.custody_address
    ) as `0x${string}`;

    console.log("cast.author", cast.author);
    if (!contentCreator) {
      return error("Invalid content creator");
    }
    const config = {
      contentHash: hash,
      contentCreator,
      contentURI: arUrl,
      beneficiary: ZERO_ADDRESS,
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
      return error("Invalid calldata");
    }

    const proposals = await getProposals({
      contractAddress: danAddress as `0x${string}`,
      castHash: hash,
    });
    const isCreated = Number(proposals?.roundIndex) > 0;
    if (isCreated) {
      return error("Proposal already created");
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
