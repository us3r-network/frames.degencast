import React from "react";

export default function Challenge({ amount }: { amount: string }) {
  return (
    <div
      tw="text-white mt-[16px] flex justify-between items-center w-full"
      style={{
        fontFamily: "Inter",
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "28px",
      }}
    >
      <div>Successfully Challenge</div>

      <div tw="flex">{`${amount} DEGEN`} </div>
    </div>
  );
}
