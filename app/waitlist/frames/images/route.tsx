import { createImagesWorker } from "frames.js/middleware/images-worker/next";
import * as fs from "node:fs";
import * as path from "node:path";

const InterFont = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/inter/Inter-Regular.otf")
);
const InterFontMedium = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/inter/Inter-Medium.otf")
);
const InterBoldFont = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/inter/Inter-Bold.otf")
);

function genImageWorker() {
  const imagesRoute = createImagesWorker({
    secret: "degencast",
    imageOptions: {
      sizes: {
        "1:1": { width: 800, height: 800 },
        "1.91:1": { width: 800, height: 418 },
      },
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
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
    },
  });
  return imagesRoute();
}

let worker = genImageWorker();

export async function GET(request: Request) {
  try {
    return await worker(request);
  } catch (e) {
    worker = genImageWorker();
    return new Response("Internal Server Error", { status: 500 });
  }
}
