/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { FRAMES_BASE_URL } from "@/lib/env";
import SelectDialogItem from "./select-dialog-item";

export default function SwapItem({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      tw="flex flex-col items-center justify-center"
      style={{
        width: "436px",
        height: "357px",
        marginTop: "20px",
        gap: "28px",
      }}
    >
      <img
        src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
        alt=""
        tw="w-24 h-24 object-cover rounded-full mr-6 mt-3"
      />
      <div
        style={{
          display: "flex",
          backgroundImage: `url(${FRAMES_BASE_URL}/images/select-dialog.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "436px",
          height: "250px",
          padding: "30px 30px",
          gap: "2px",
        }}
      >
        <SelectDialogItem title="Token" value={"DEGEN"} />
        <SelectDialogItem title="Market cap" value="$2229.3M" />
        <SelectDialogItem title="Price" value="$0.028282" />
        <SelectDialogItem title="Buy/Sell(24H)" value="13.1313" />
      </div>
    </div>
  );
}
