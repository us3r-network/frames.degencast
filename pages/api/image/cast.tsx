import { Layout } from "@/lib/cast-image/Layout";
import { getCastWithHash } from "@/lib/createproposal/neynar-api";
// import { NextRequest } from "next/server";
import satori from "satori";
import * as fs from "node:fs";
import * as path from "node:path";

export const config = {
  runtime: "nodejs",
};

const MontserratMediumItalic = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/montserrat/Montserrat-Italic.ttf")
);
const MontserratBoldItalic = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/montserrat/Montserrat-BoldItalic.ttf")
);
const MontserratBlackItalic = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/montserrat/Montserrat-BlackItalic.ttf")
);
export default async function handler(req: any, res: any) {
  const { hash } = req.query;

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
  // const host = req.host;
  // const [MontserratMediumNormal, MontserratBoldNormal, MontserratBlackNormal] =
  //   await Promise.all([
  //     fetch(
  //       new URL(`fonts/montserrat/Montserrat-Medium.ttf`, host).toString()
  //     ).then((res) => res.arrayBuffer()),
  //     fetch(
  //       new URL(`fonts/montserrat/Montserrat-Bold.ttf`, host).toString()
  //     ).then((res) => res.arrayBuffer()),
  //     fetch(
  //       new URL(`fonts/montserrat/Montserrat-Black.ttf`, host).toString()
  //     ).then((res) => res.arrayBuffer()),
  //   ]);
  // const [MontserratMediumItalic, MontserratBoldItalic, MontserratBlackItalic] =
  //   await Promise.all([
  //     fetch(
  //       new URL(`fonts/montserrat/Montserrat-Italic.ttf`, host).toString()
  //     ).then((res) => res.arrayBuffer()),
  //     fetch(
  //       new URL(`fonts/montserrat/Montserrat-BoldItalic.ttf`, host).toString()
  //     ).then((res) => res.arrayBuffer()),
  //     fetch(
  //       new URL(`fonts/montserrat/Montserrat-BlackItalic.ttf`, host).toString()
  //     ).then((res) => res.arrayBuffer()),
  //   ]);
  console.log("fetched fonts");

  const svg = await satori(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        fontStyle: "italic",
      }}
    >
      {element}
    </div>,
    {
      width: 1000,
      height: 1000,
      fonts: [
        {
          name: "Montserrat",
          data: MontserratMediumItalic,
          weight: 500,
          style: "italic",
        },
        {
          name: "Montserrat",
          data: MontserratBoldItalic,
          weight: 700,
          style: "italic",
        },
        {
          name: "Montserrat",
          data: MontserratBlackItalic,
          weight: 900,
          style: "italic",
        },
      ],
    }
  );

  // return new Response(svg, {
  //   headers: {
  //     "Content-Type": "image/svg+xml",
  //   },
  // });
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}

function ErrorLayout({ title }: { title: string }) {
  return (
    <div tw="w-full h-full flex flex-row items-center justify-center">
      {title}
    </div>
  );
}
