import { erc20Abi } from "viem";
import QuoterV2 from "@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json";
import { FeeAmount } from "@uniswap/v3-sdk";

import { baseSepoliaClient, baseClient } from "../viem";
import { DanContractABI } from "./dan";
import { FactoryContractABI } from "./factory";
import { BASE_NETWORK, CURATION_FACTORY_ADDRESS, DEGEN_ADDRESS, UNISWAP_QUOTEV2_ADDRESS } from "../env";
import { CurationABI } from "./curation";


const client = BASE_NETWORK === 'main' ? baseClient : baseSepoliaClient;

export async function getProposePrice(danAddress: `0x${string}`, castHash: string) {
    const price = await client.readContract({
        abi: DanContractABI,
        address: danAddress,
        functionName: "getProposePrice",
        args: [castHash],
    });
    return price as bigint;
}

export async function getDisputePrice(danAddress: `0x${string}`, castHash: string) {
    const price = await client.readContract({
        abi: DanContractABI,
        address: danAddress,
        functionName: "getDisputePrice",
        args: [castHash],
    });
    return price as bigint;

}

export async function getProposal(danAddress: `0x${string}`, castHash: string) {
    const proposal = await client.readContract({
        abi: DanContractABI,
        address: danAddress,
        functionName: "getProposal",
        args: [castHash],
    }) as {
        roundIndex: BigInt,
        deadline: BigInt,
        state: number,
    };
    return proposal
}

export async function getApprovedAmount(danAddress: `0x${string}`, wallet: `0x${string}`) {
    const amount = await client.readContract({
        abi: erc20Abi,
        address: DEGEN_ADDRESS,
        functionName: "allowance",
        args: [wallet, danAddress],
    });
    return amount as bigint;
}

export async function getMintPrice(curation: `0x${string}`, amount: number) {
    const price = await client.readContract({
        abi: FactoryContractABI,
        address: CURATION_FACTORY_ADDRESS,
        functionName: "getMintNFTPriceAfterFee",
        args: [curation, BigInt(amount)],
    });
    return price as bigint;
}

export async function getCurationBalance(curation: `0x${string}`, wallet: `0x${string}`) {
    const balance = await client.readContract({
        abi: erc20Abi,
        address: curation,
        functionName: "balanceOf",
        args: [wallet],
    });
    return balance as bigint;
}

export async function checkCurationHasGraduate(curation: `0x${string}`) {
    const tokenInfo = await client.readContract({
        abi: FactoryContractABI,
        address: CURATION_FACTORY_ADDRESS,
        functionName: "getTokenInfo",
        args: [curation],
    });
    return tokenInfo.graduated;
}

export async function getMintPriceFromUniswap(curation: `0x${string}`, amount: number) {
    const tokenUnit = await client.readContract({
        abi: CurationABI,
        address: curation,
        functionName: "tokenUnit",
        args: [],
    }) as bigint;
    const amountOutData: any = await client.readContract({
        abi: QuoterV2.abi,
        address: UNISWAP_QUOTEV2_ADDRESS,
        functionName: "quoteExactOutputSingle",
        args: [{
            tokenIn: DEGEN_ADDRESS,
            tokenOut: curation,
            amount: BigInt(amount) * tokenUnit * BigInt(1e18),
            fee: FeeAmount.MEDIUM,
            sqrtPriceLimitX96: 0,
        }],
    });
    // console.log('getMintPriceFromUniswap', amountOut);
    // getMintPriceFromUniswap [ 37617341369683162043n, 4879343079835459036988009651n, 0, 101576n ]
    const amountOut = amountOutData[0];

    return amountOut as bigint;
}

