import { FRAMES_BASE_URL } from "@/lib/env";
import { PropsWithChildren } from "react";

export default function ImageWrapper({ children }: PropsWithChildren) {
  return (
    <div tw="text-white w-full h-full flex flex-col items-center justify-center bg-[#4C2896]">
      {children}
    </div>
  );
}