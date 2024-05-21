import { FRAMES_BASE_URL } from "@/lib/env";
import { createFrames } from "frames.js/next";
import * as fs from "node:fs";
import * as path from "node:path";

export const frames = createFrames({
  basePath: "/swaptoken",
  baseUrl: FRAMES_BASE_URL,
});

export const pixelFont = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/pixel/Pixeled.ttf")
);
