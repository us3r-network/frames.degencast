import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/createproposal",
  baseUrl: process.env.FRAMES_BASE_URL,
});

export const imageOptions = {
  width: 800,
  height: 480,
};
