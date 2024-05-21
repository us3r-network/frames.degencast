import { FRAMES_BASE_URL } from "@/lib/env";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/atttoken/frames",
  baseUrl: FRAMES_BASE_URL,
});
