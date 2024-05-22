/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import formatPrice from "@/lib/formatPrice";

export function StarItem({
  title,
  imageURL,
  value,
  fdvUsd,
  priceChange24,
}: {
  title: string;
  imageURL: string;
  value: number;
  fdvUsd: number;
  priceChange24: number;
}) {
  const fdvUsdString = formatPrice(fdvUsd);
  return (
    <div
      tw="flex flex-row"
      style={{
        fontSize: "20px",
        padding: "0px 180px",
      }}
    >
      <div tw="flex flex-row items-center ">
        <img
          src={`${imageURL}`}
          alt=""
          tw="w-24 h-24  rounded-full mr-6 mt-3"
        />

        <div tw="flex flex-col">
          <div tw="flex flex-row uppercase" className="flex-row uppercase">
            {title}
          </div>
          <div tw="flex flex-row">
            <div
              tw="flex flex-row mr-5"
              style={{
                color: "#A36EFE",
              }}
            >
              {"FDV".toUpperCase()}
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {fdvUsdString}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: priceChange24 > 0 ? "#00D1A7" : "#F41F4C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        {`${priceChange24}%`}
      </div>
    </div>
  );
}
