import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/atttoken/frames",
  baseUrl: process.env.FRAMES_BASE_URL,
});
