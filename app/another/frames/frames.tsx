import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/another",
  baseUrl: process.env.FRAMES_BASE_URL,
});
