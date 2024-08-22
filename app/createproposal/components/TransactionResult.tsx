/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from "react";

export default function TransactionResult({
  castHash,
  completed,
  failed,
}: {
  castHash: string;
  completed?: boolean;
  failed?: boolean;
}) {
  return (
    <div tw="bg-[#4C2896] flex flex-col  items-center justify-center w-full h-full p-[32px]">
      {completed && (
        <div
          tw={`text-white flex justify-center items-center w-full text-[#00D1A7]`}
          style={{
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div>Transaction Completed!</div>
        </div>
      )}
      {failed && (
        <div
          tw={`text-white flex justify-center items-center w-full text-[#F41F4C]`}
          style={{
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "28px",
          }}
        >
          <div>Transaction Failed</div>
        </div>
      )}

      <img
        tw="w-[600px] h-[600px] mt-[16px]"
        src={`https://api-dev.u3.xyz/3r-farcaster/cast-image?castHash=${castHash}`}
        alt=""
      />
    </div>
  );
}
