import { ApiRespCode, AsyncRequestStatus } from "@/lib/createproposal/api";
import { NeynarCast } from "@/lib/createproposal/neynar-types";
import { AttentionTokenEntity } from "@/lib/createproposal/types/attention-token";
import { CommunityEntity } from "@/lib/createproposal/types/community";
import { ProposalEntity } from "@/lib/createproposal/types/proposal";
import { useRef, useState } from "react";
import { getExploreCastFeeds } from "../lib/api";

const PAGE_SIZE = 10;
export type CastFeedsItem = {
  channel: CommunityEntity;
  tokenInfo: AttentionTokenEntity;
  cast: NeynarCast;
  proposal: ProposalEntity;
};

export default function useLoadCastFeeds(props?: { type?: string }) {
  const [items, setItems] = useState<CastFeedsItem[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const [hasNextPage, setHasNextPage] = useState(true);
  const typeRef = useRef(props?.type || "");
  const pageInfoRef = useRef({
    hasNextPage: true,
    nextCursor: "",
    nextPageNumber: 1,
  });

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async () => {
    const type = typeRef.current;
    const { hasNextPage, nextCursor, nextPageNumber } = pageInfoRef.current;

    if (hasNextPage === false) {
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const params = {
        limit: PAGE_SIZE,
        cursor: nextCursor,
        pageNumber: nextPageNumber,
        ...(type && { type }),
      };
      const resp = await getExploreCastFeeds(params);
      if (resp.code !== ApiRespCode.SUCCESS) {
        throw new Error(resp.msg);
      }
      const { data } = resp;
      const { casts, next } = data;
      console.log("casts", casts);

      setItems([...items, ...casts]);

      const hasMore =
        !!next.cursor &&
        (casts.length >= PAGE_SIZE ||
          (casts.length > 0 && next.cursor !== nextCursor));
      pageInfoRef.current = {
        hasNextPage: hasMore,
        nextCursor: next.cursor,
        nextPageNumber: nextPageNumber + 1,
      };
      setHasNextPage(hasMore);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
      pageInfoRef.current = {
        hasNextPage: false,
        nextCursor,
        nextPageNumber,
      };
      setHasNextPage(false);
    }
  };

  return {
    loading,
    items,
    loadItems,
    hasNextPage,
  };
}
