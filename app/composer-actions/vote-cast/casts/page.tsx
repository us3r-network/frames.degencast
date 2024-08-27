"use client";

import { useEffect, useState } from "react";
import useLoadCastFeeds from "../hooks/useLoadCastFeeds";
import ChannelCastCard from "../components/ChannelCastCard";

export default function VoteCasts() {
  const { loadItems, loading, items } = useLoadCastFeeds();
  useEffect(() => {
    loadItems();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-6 bg-[#2A2432] overflow-y-auto">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center text-white">
          Loading...
        </div>
      ) : (
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
      )}
    </div>
  );
}
