import { PropsWithChildren } from "react";

export default function ImageWrapper({ children }: PropsWithChildren) {
  return (
    <div tw="text-white w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A]">
      {children}
    </div>
  );
}
