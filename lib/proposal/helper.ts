import { baseSepoliaClient, baseClient } from "../viem";
import { DanContractABI } from "./dan";


const client = baseSepoliaClient;

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