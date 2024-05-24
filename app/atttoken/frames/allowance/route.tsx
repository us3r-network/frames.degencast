/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { FRAMES_BASE_URL } from "@/lib/env";
import { frames, pixelFont } from "../frames";
import { Button } from "frames.js/next";
import { getUserDataByFid } from "@/lib/hub";
import { getAllowanceInfo } from "@/lib/api";

export const POST = frames(async (ctx) => {
  const attnft = ctx.searchParams?.attnft || "";
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const requesterFid = ctx.message?.requesterFid!;
  const user = await getUserDataByFid(Number(requesterFid));
  // const allowanceInfo = await getAllowanceInfo(attnft, Number(requesterFid));
  const allowanceInfo = {
    data: {
      allowance: 100000,
      remaining: 10000,
      tipsReceived: 1000,
      shares: 100,
      rank: 1,
      tipsKeyword: "attToken",
    },
  };

  console.log({ attnft });
  return {
    image: (
      <div
        tw="text-white w-full h-full flex flex-col"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${FRAMES_BASE_URL}/images/bg.png')`,
        }}
      >
        <div
          tw="flex flex-col"
          style={{
            margin: "30px 56px 20px 56px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {attnft.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                color: "#A36EFE",
                display: "flex",
              }}
            >
              TIPS KEYWORD:
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}></div>
            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {allowanceInfo.data.tipsKeyword}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              {user.username.toUpperCase()}
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}></div>
            <div
              style={{
                display: "flex",
                gap: "18px",
              }}
            >
              <div
                style={{
                  color: "#A36EFE",
                  display: "flex",
                }}
              >
                RANK
              </div>

              <div
                style={{
                  color: "white",
                  display: "flex",
                }}
              >
                {allowanceInfo.data.rank}
              </div>
            </div>
          </div>
        </div>
        <div
          tw="flex flex-row"
          style={{
            padding: "0px 56px 0 56px",
            gap: "18px",
          }}
        >
          <div
            tw="flex justify-center items-center"
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${FRAMES_BASE_URL}/images/atttoken/pixel-border.png)`,
              width: "176px",
              height: "176px",
              padding: "8px",
            }}
          >
            <img src={`${user.pfp}`} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              backgroundImage: `url(${FRAMES_BASE_URL}/images/atttoken/dialog-border.png)`,
              alignItems: "flex-start",
              width: "486px",
              height: "180px",
              color: "#000",
              padding: "16px 0",
              gap: "0px",
            }}
          >
            <Item title="Allowance" value={allowanceInfo.data.allowance} />
            <Item title="Remaining" value={allowanceInfo.data.remaining} />
            <Item
              title="Tips Received"
              value={allowanceInfo.data.tipsReceived}
            />
            <Item title="Shares" value={allowanceInfo.data.shares} />
          </div>
        </div>
      </div>
    ),
    imageOptions: {
      width: 800,
      height: 480,
      fonts: [
        {
          data: pixelFont,
          name: "upheaval",
        },
      ],
    },

    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/frames/allowance",
          query: { attnft, inviteFid },
        }}
      >
        Refresh
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/shares",
          query: {
            attnft,
            inviteFid,
          },
        }}
      >
        Buy shares
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/share-more",
          query: { attnft, inviteFid },
        }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

function Item({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        gap: "8px",
        padding: "0 30px",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          color: "#A36EFE",
          display: "flex",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: "#000",
          display: "flex",
        }}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}
