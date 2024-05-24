/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, imageOptions, pixelFont } from "../frames";
import { FRAMES_BASE_URL } from "@/lib/env";
import { getUserDataByFid } from "@/lib/hub";
import { createPublicClient, formatEther, getContract, http } from "viem";
import { baseSepolia } from "viem/chains";
import { AttToken } from "@/lib/contract/att-token";
import { getAddressFromFid } from "@/lib/hub";
import { AttTokenMirror } from "@/lib/contract/att-token-mirror";

const handleRequest = frames(async (ctx) => {
  const attnft = ctx.searchParams?.attnft || "";
  const inviteFid = ctx.searchParams?.inviteFid || "";
  // TODO: get attToken address
  const attTokenAddress = "0x83B1B6a7879641a0BC956D83a3d9C3FBE9e9d556";
  const requesterFid = ctx.message?.requesterFid!;

  const { ethAddress } = (await getAddressFromFid(Number(requesterFid))) as {
    ethAddress: `0x${string}`;
  };
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const attToken = getContract({
    address: attTokenAddress as `0x${string}`,
    abi: AttToken.abi,
    client: publicClient,
  });

  const attTokenPrice = (await attToken.read.getMintNFTPrice([1])) as bigint;
  const mirror = (await attToken.read.mirrorERC721()) as string;
  const mirror721 = getContract({
    address: mirror as `0x${string}`,
    abi: AttTokenMirror.abi,
    client: publicClient,
  });
  const shareBalance = (await mirror721.read.balanceOf([ethAddress])) as bigint;

  if (!attnft) {
    return {
      image: (
        <Container>
          <Title title={"invalid share"} />
        </Container>
      ),
      imageOptions: {
        fonts: [
          {
            data: pixelFont,
            name: "upheaval",
          },
        ],
      },
    };
  }

  const user = await getUserDataByFid(Number(requesterFid));
  return {
    image: (
      <div
        tw="text-white w-full h-full flex flex-col"
        style={{
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${FRAMES_BASE_URL}/images/atttoken/share-bg.png')`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "56px 56px 0 56px",
            gap: "18px",
          }}
        >
          <div
            tw="flex justify-center items-center"
            style={{
              backgroundImage: `url(${FRAMES_BASE_URL}/images/atttoken/pixel-border.png)`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              width: "165px",
              height: "165px",
              padding: "8px",
            }}
          >
            <img src={`${user.pfp}`} alt="" />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "510px",
            }}
          >
            <div
              style={{
                color: "white",
                display: "flex",
                flexDirection: "row",
                fontSize: "16px",
              }}
            >
              <span>{user.username.toUpperCase()}</span>
              <div style={{ display: "flex", flexGrow: 1 }}></div>
              <span>{attnft.toUpperCase()}</span>
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
                PRICE:
              </div>
              <div style={{ display: "flex", flexGrow: 1 }}></div>
              <div
                style={{
                  color: "white",
                  display: "flex",
                }}
              >
                {Number(formatEther(attTokenPrice)).toFixed(2)}
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
                  color: "#A36EFE",
                  display: "flex",
                }}
              >
                HOLDING:
              </div>
              <div style={{ display: "flex", flexGrow: 1 }}></div>
              <div
                style={{
                  color: "white",
                  display: "flex",
                }}
              >
                {shareBalance}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    imageOptions: imageOptions,
    textInput: "Quantity of shares...",
    buttons: [
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/mint-nft`,
          query: { inviteFid, attnft, attTokenAddress },
        }}
        post_url={{
          pathname: "/frames/success",
          query: { inviteFid, attnft, attTokenAddress },
        }}
      >
        Buy
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: `/tx-data/approve`,
          query: { inviteFid, attnft, attTokenAddress },
        }}
        post_url={{
          pathname: "/frames/success/approve",
          query: { inviteFid, attnft, attTokenAddress },
        }}
      >
        Sell
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/frames/share",
          query: { attnft, inviteFid },
        }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      tw="text-white w-full h-full flex flex-col"
      style={{
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('${FRAMES_BASE_URL}/images/atttoken/cover.png')`,
      }}
    >
      {children}
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div
      tw="w-full justify-center items-center flex flex-col uppercase"
      className="uppercase"
      style={{
        padding: "66px 56px 0 56px",
        fontSize: "60px",
      }}
    >
      {title}
    </div>
  );
}
