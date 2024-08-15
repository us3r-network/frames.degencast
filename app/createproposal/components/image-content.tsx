/* eslint-disable @next/next/no-img-element */
import { FRAMES_BASE_URL } from "@/lib/env";

export default function ImageContent({
  castImgUrl,
}: {
  castImgUrl: string;
  channelInfo?: any;
}) {
  return (
    <div tw=" w-full h-full flex flex-col p-[16px] box-border gap-[16px]">
      <div tw="flex-1 flex flex-row gap-[24px]">
        <img src={castImgUrl} alt="" tw="flex flex-1" />
        <div tw="flex flex-1 h-full flex-col item-center">channel info</div>
      </div>

      <div tw="flex flex-1">About</div>
    </div>
  );
}
