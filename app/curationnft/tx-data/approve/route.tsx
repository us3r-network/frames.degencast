import {
  CURATION_FACTORY_ADDRESS,
  DEGEN_ADDRESS,
  DEGENCAST_API,
} from "@/lib/env";
import { error } from "frames.js/core";
import { parseEther, erc20Abi, encodeFunctionData } from "viem";
import { base, baseSepolia } from "viem/chains";
import { transaction } from "frames.js/core";
import { frames } from "../../frames/frames";
import {
  checkCurationHasGraduate,
  getMintPrice,
} from "../../../../lib/proposal/helper";

export const POST = frames(async (ctx) => {
  const amount = ctx.message?.inputText || "1";
  const castHash = ctx.searchParams?.castHash || "";

  let communityCuration;
  let castInfo;
  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/proposal`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    throw error("Error fetching castInfo");
  }
  communityCuration = castInfo?.data.tokenAddr;
  if (!communityCuration) {
    throw error("CommunityCuration is required");
  }

  let mintPrice: bigint | undefined;
  const graduated = await checkCurationHasGraduate(communityCuration);

  if (graduated) {
    // TODO: get mint price for graduated curation
    mintPrice = BigInt(0);
  } else {
    mintPrice = await getMintPrice(communityCuration, Number(amount));
  }
  console.log("mintPrice", mintPrice);

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [CURATION_FACTORY_ADDRESS as `0x`, mintPrice],
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: erc20Abi,
      to: DEGEN_ADDRESS,
      data: calldata,
    },
  });
});