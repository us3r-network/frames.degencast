import { NeynarCast } from "../createproposal/neynar-types";
import { getEmbeds } from "../getEmbeds";
import CastText from "./CastText";
import EmbedImg from "./EmbedImg";
import EmbedOg from "./EmbedOg";

export default function CastContent({ cast }: { cast: NeynarCast }) {
  const { imgs, videos, ogs, frames, casts } = getEmbeds(cast);
  const hasImg = imgs.length > 0;
  const hasVideo = videos.length > 0;
  const hasOg = ogs.length > 0;
  const hasFrame = frames.length > 0;
  const hasCast = casts.length > 0;

  // only text
  if (!hasImg && !hasOg && !hasFrame && !hasCast && !hasVideo) {
    return <CastText text={cast.text} />;
  }

  // text and image
  if (!hasOg && !hasFrame && !hasCast && !hasVideo) {
    return <EmbedImg text={cast.text} imgs={imgs} />;
  }

  // text and og
  if (!hasImg && !hasFrame && !hasCast && !hasVideo) {
    return <EmbedOg text={cast.text} ogs={ogs} />;
  }

  return null;
}
