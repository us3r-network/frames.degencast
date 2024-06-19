import { FRAMES_BASE_URL } from "@/lib/env";
import SelectDialogItem from "./select-dialog-item";

export default function SwapItem() {
  return (
    <div
      style={{
        width: "305px",
        height: "286px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "28px",
        fontSize: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid #fff",
        }}
      >
        {/* 
            <Image
              src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
            />*/}
      </div>
      <div
        tw="flex flex-col"
        style={{
          backgroundImage: `url(${FRAMES_BASE_URL}/images/select-dialog.png)`,
          width: "305px",
          height: "176px",
          padding: "15px 25px",
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
