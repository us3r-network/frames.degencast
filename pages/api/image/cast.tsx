import { Layout } from "@/lib/cast-image/Layout";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const hash = searchParams.get("hash");

  let element = null;

  if (!hash) {
    element = <ErrorLayout title="Requires the hash parameter" />;
  } else {
    try {
      const cast = await getCastWithHash(hash);
      if (cast?.hash) {
        element = <Layout cast={cast} />;
      } else {
        element = <ErrorLayout title="Not find cast" />;
      }
    } catch (error) {
      element = <ErrorLayout title="Error when fetching cast" />;
    }
  }

  const host = req.nextUrl.origin;
  const [InterFont, InterFontMedium, InterBoldFont] = await Promise.all([
    fetch(new URL(`fonts/inter/Inter-Regular.otf`, host).toString()).then(
      (res) => res.arrayBuffer()
    ),
    fetch(new URL(`fonts/inter/Inter-Medium.otf`, host).toString()).then(
      (res) => res.arrayBuffer()
    ),
    fetch(new URL(`fonts/inter/Inter-Bold.otf`, host).toString()).then((res) =>
      res.arrayBuffer()
    ),
  ]);
  return new ImageResponse(element as JSX.Element, {
    width: 1000,
    height: 1000,
    fonts: [
      {
        name: "Inter",
        data: InterFont,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: InterFontMedium,
        weight: 500,
        style: "normal",
      },
      {
        name: "Inter",
        data: InterBoldFont,
        weight: 700,
        style: "normal",
      },
    ],
  });
}

function ErrorLayout({ title }: { title: string }) {
  return (
    <div tw="w-full h-full flex flex-row items-center justify-center">
      {title}
    </div>
  );
}
