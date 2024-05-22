/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { FRAMES_BASE_URL } from "@/lib/env";
import SelectDialogItem from "./select-dialog-item";
import formatPrice from "@/lib/formatPrice";

export default function SwapItem({
  title,
  value,
  imageURL,
  fdvUsd,
  volumeUsd,
  price,
}: {
  title: string;
  value: number;
  imageURL: string;
  fdvUsd: number;
  volumeUsd: number;
  price: number;
}) {
  const fdvUsdString = formatPrice(fdvUsd);
  const volumeUsdString = formatPrice(volumeUsd);
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
      <img src={`${imageURL}`} alt="" tw="w-24 h-24  rounded-full mr-6 mt-3" />
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
        <SelectDialogItem title="Token" value={title} />
        <SelectDialogItem title="FDV" value={`$${fdvUsdString}`} />
        <SelectDialogItem title="Price" value={`$${price.toFixed(6)}`} />
        <SelectDialogItem title="Buy/Sell(24H)" value={`$${volumeUsdString}`} />
      </div>
    </div>
  );
}
