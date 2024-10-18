import { ProposalState } from "@/lib/createproposal/proposal-helper";
import { FRAMES_BASE_URL } from "./env";

export default function getFrameUrlWithState(
  state: ProposalState,
  castHash: string,
  inviteFid?: string
) {
  switch (state) {
    case ProposalState.NotProposed:
    //   return `${FRAMES_BASE_URL}/createproposal/frames/propose/${castHash}?inviteFid=${inviteFid||""}`;
    case ProposalState.Proposed:
    case ProposalState.Accepted:
    case ProposalState.Disputed:
      return `${FRAMES_BASE_URL}/proposal/frames?inviteFid=${
        inviteFid || ""
      }&castHash=${castHash}`;
    case ProposalState.ReadyToMint:
    case ProposalState.Abandoned:
      return `${FRAMES_BASE_URL}/curationnft/frames?inviteFid=${
        inviteFid || ""
      }&castHash=${castHash}`;
    default:
      return "";
  }
}

export function getNftframe(castHash: string, inviteFid?: string) {
  return `${FRAMES_BASE_URL}/curationnft/frames?inviteFid=${
    inviteFid || ""
  }&castHash=${castHash}`;
}
