"use client";

import { ProposalState } from "@/lib/createproposal/proposal-helper";
import { ProposalEntity } from "@/lib/createproposal/types/proposal";
import { useMemo } from "react";

export type ProposalStatusActionsProps = {
  proposal: ProposalEntity;
};
export function ProposalStatus({ proposal }: ProposalStatusActionsProps) {
  const { status, roundIndex } = proposal;
  const data = useMemo(() => {
    switch (status) {
      case ProposalState.NotProposed:
        return {
          text: "Voteable",
          color: "#F2B949",
        };
      case ProposalState.Proposed:
        return {
          text: "Upvote",
          color: "#00D1A7",
        };
      case ProposalState.Accepted:
        if (Number(roundIndex) <= 1) {
          return {
            text: "Upvote",
            color: "#00D1A7",
          };
        }
        return {
          text: "Accepted",
          color: "#F2B949",
        };
      case ProposalState.Disputed:
        return {
          text: "Downvote",
          color: "#F41F4C",
        };
      case ProposalState.ReadyToMint:
        return {
          text: "Mintable",
          color: "#00D1A7",
        };
      case ProposalState.Abandoned:
        return {
          text: "Abandoned",
          color: "#F41F4C",
        };
      default:
        return null;
    }
  }, [status, roundIndex]);

  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-row items-center gap-1">
      <div
        className="rounded-full h-[8px] w-[8px]"
        style={{
          backgroundColor: data.color,
        }}
      ></div>
      <span className="text-xs">State: {data.text}</span>
    </div>
  );
}
