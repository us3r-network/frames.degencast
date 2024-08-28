"use client";

import { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useLoadCastFeeds from "../hooks/useLoadCastFeeds";
import ChannelCastCard from "../components/ChannelCastCard";
import { cn } from "@/lib/utils";
import ComposerDescription from "../components/ComposerDescription";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

function VoteCasts() {
  const searchParams = useSearchParams();
  const fid = searchParams.get("fid") || "";
  const { loadItems, loading, items, hasNextPage } = useLoadCastFeeds({ fid });
  const loader = (
    <div
      className={cn("w-full flex items-center justify-center text-white py-4")}
    >
      {hasNextPage ? "Loading..." : "No more data"}
    </div>
  );
  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-6 bg-[#2A2432] overflow-y-auto">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (loading) return;
          loadItems();
        }}
        hasMore={hasNextPage}
        loader={loader}
        useWindow={false}
      >
        <ComposerDescription />
        <Separator className="my-4 bg-[#A36EFE33]" />
        <div className="w-full flex flex-col gap-4 ">
          {items.map((item) => {
            const { cast, proposal, channel, tokenInfo } = item;
            return (
              <ChannelCastCard
                key={cast.hash}
                cast={cast}
                proposal={proposal}
                channel={channel}
                tokenInfo={tokenInfo}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default function VoteCastPage() {
  return (
    <Suspense>
      <VoteCasts />
    </Suspense>
  );
}
