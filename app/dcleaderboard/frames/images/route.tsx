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

const ChangaFontRegular = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/changa-one/ChangaOne-Regular.ttf")
);
const ChangeFontItalic = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/changa-one/ChangaOne-Italic.ttf")
);

const MontserratMediumItalic = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/montserrat/Montserrat-Italic.ttf")
);

const firaScriptData = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/fira-code/FiraCodeiScript-Regular.ttf")
);

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
      },
      {
        name: "Inter",
        data: InterBoldFont,
        weight: 700,
      },
      {
        name: "Fira Code",
        data: firaScriptData,
        weight: 700,
      },
      {
        name: "Changa",
        data: ChangaFontRegular,
        weight: 400,
      },
      {
        name: "Changa",
        data: ChangeFontItalic,
        weight: 400,
        style: "italic",
      },
      {
        name: "Montserrat",
        data: MontserratMediumItalic,
        weight: 500,
        style: "italic",
      },
    ],
  },
});
export const GET = imagesRoute();
