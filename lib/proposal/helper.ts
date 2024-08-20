import { erc20Abi } from "viem";
import { baseSepoliaClient, baseClient } from "../viem";
import { DanContractABI } from "./dan";
import { FactoryContractABI } from "./factory";
import { BASE_NETWORK, CURATION_FACTORY_ADDRESS, DEGEN_ADDRESS } from "../env";


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
    console.log(tokenInfo);
    return tokenInfo.graduated;
}