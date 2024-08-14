import React from "react";

export default function Tint({ msg }: { msg: string }) {
  return (
    <div
      tw="text-[#A36EFE] mt-[32px] flex justify-center items-center w-full"
      style={{
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "24px",
      }}
    >
      {msg}
    </div>
  );
}
