import { createFrames } from "frames.js/next";
import { imagesWorkerMiddleware } from "frames.js/middleware/images-worker";

export const frames = createFrames({
  basePath: "/dcleaderboard",
  baseUrl: process.env.FRAMES_BASE_URL,
  imagesRoute: "/frames/images",
  middleware: [
    imagesWorkerMiddleware({
      imagesRoute: "/frames/images",
      secret: "degencast",
    }),
  ],
});
