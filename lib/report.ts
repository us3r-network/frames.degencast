import { DEGENCAST_API } from "./env";

export function reportBuyAttNftSuccess(reportData: {
  buyerFid: string;
  sharerFid: string;
  tx: string;
}) {
  fetch(`${DEGENCAST_API}/degencast-users/frame-actions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportData),
  })
    .then(() => {
      console.log("frame-actions success", reportData);
    })
    .catch(console.error);
}
