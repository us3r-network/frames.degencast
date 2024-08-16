import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/createproposal",
  baseUrl: process.env.FRAMES_BASE_URL,
});

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

export const imageOptions: {
  aspectRatio?: "1.91:1" | "1:1";
} & any = {
  aspectRatio: "1:1",
  width: 800,
  height: 800,
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
};
