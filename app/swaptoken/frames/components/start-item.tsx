/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

export function StarItem({ title, value }: { title: string; value: number }) {
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
          src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
          alt=""
          tw="w-24 h-24 object-cover rounded-full mr-6 mt-3"
        />

        <div tw="flex flex-col">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            DEGEN
          </div>
          <div tw="flex flex-row gap-10" className="gap-10">
            <div
              tw="flex flex-row mr-5"
              style={{
                color: "#A36EFE",
              }}
            >
              {"Market Cap".toUpperCase()}
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {"2229M"}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: "#F41F4C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        -32.32%
      </div>
    </div>
  );
}
