
export enum ProposalState {
    NotProposed = -1,
    Proposed = 0,
    Accepted = 1,
    Disputed = 2,
    ReadyToMint = 3,
    Abandoned = 4,
}

export type ProposalType = "Upvote" | "Downvote";

// export const ProposalStateMap = {
//     [ProposalState.Proposed]: "Proposed",
//     [ProposalState.Accepted]: "Accepted",
//     [ProposalState.Disputed]: "Disputed",
//     [ProposalState.ReadyToMint]: "Ready To Mint",
//     [ProposalState.Abandoned]: "Abandoned",
// }
// ProposalStateMap[0]

export function getProposalState(state: number): string {
    switch (state) {
        case ProposalState.NotProposed:
            return "Not Proposed";
        case ProposalState.Proposed:
            // return "Proposed";
            return "Voteable"
        case ProposalState.Accepted:
            return "👍Upvoted";
        case ProposalState.Disputed:
            // return "Disputed";
            return '👎Downvoted';
        case ProposalState.ReadyToMint:
            return "Ready To Mint";
        case ProposalState.Abandoned:
            return "Abandoned";
        default:
            return "Unknown";
    }
}