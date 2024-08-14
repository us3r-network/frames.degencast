import React from "react";

export default function Button({ text }: { text: string }) {
  return (
    <button
      tw="w-full mt-[16px] flex items-center justify-center bg-[#9151C3] text-white"
      style={{
        padding: "8px",
        fontSize: "24px",
        fontWeight: 500,
        lineHeight: "28px",
        borderRadius: "8px",
      }}
    >
      {text}
    </button>
  );
}
