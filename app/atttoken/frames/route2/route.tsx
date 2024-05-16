/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async () => {
  return {
    image: <div tw="flex">Route 2</div>,
    buttons: [
      <Button action="post" target="/route1">
        Go to route 1
      </Button>,
    ],
  };
});
