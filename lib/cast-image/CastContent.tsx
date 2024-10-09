import { NeynarCast } from "../createproposal/neynar-types";
import { getEmbeds } from "../getEmbeds";
import CastText from "./CastText";
import EmbedImg from "./EmbedImg";

export default function CastContent({ cast }: { cast: NeynarCast }) {
  const { imgs, videos, webpages, casts } = getEmbeds(cast);
  const hasImg = imgs.length > 0;
  const hasVideo = videos.length > 0;
  const hasWebpage = webpages.length > 0;
  const hasCast = casts.length > 0;
  if (!hasImg && !hasVideo && !hasWebpage && !hasCast) {
    return <CastText text={cast.text} />;
  }
  if (!hasVideo && !hasWebpage && !hasCast) {
    return <EmbedImg text={cast.text} imgs={imgs} />;
  }
  return null;
}
