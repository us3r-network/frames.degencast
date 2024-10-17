import { Buffer } from "buffer";
import { NeynarCast, NeynarFrame } from "./createproposal/neynar-types";

export function isImg(url?: string) {
  if (!url) return false;
  return (
    url.endsWith(".png") ||
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".gif") ||
    url.startsWith("https://imagedelivery")
  );
}

export function isVideo(url?: string) {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".mov") ||
    url.endsWith(".avi") ||
    url.endsWith(".webm") ||
    url.endsWith(".mkv") ||
    url.endsWith(".m3u8")
  );
}

export type ImageMetadata = {
  content_type: string;
  content_length: string;
  image: {
    width_px: number;
    height_px: number;
  };
};
export type OgMetadata = {
  content_type: string;
  content_length: number | null;
  html: {
    ogUrl: string;
    ogType: "article";
    charset: "utf-8";
    favicon: string;
    ogImage: [
      {
        url: string;
        type: "png";
      }
    ];
    ogTitle: string;
    ogLocale: "en_US";
    ogSiteName: string;
    twitterUrl: string;
    twitterCard: "summary_large_image";
    twitterImage: [
      {
        url: string;
      }
    ];
    twitterTitle: string;
    articleAuthor: string;
    ogDescription: string;
    twitterDescription: string;
  };
};
export type FrameMetadata = {
  version: "vNext";
  image: string;
  image_aspect_ratio: "1:1";
  buttons: Array<{
    index: number;
    title: string;
    action_type: "post";
    target: string;
  }>;
  input: {};
  state: {};
  post_url: string;
  frames_url: string;
};
export type Embeds = {
  imgs: Array<{
    metadata: ImageMetadata;
    url: string;
  }>;
  videos: Array<{
    url: string;
  }>;
  ogs: Array<{
    metadata: OgMetadata;
    url: string;
  }>;
  frames: Array<{
    metadata: NeynarFrame;
    url: string;
  }>;
  casts: Array<{ fid: number; hash: string }>;
};

export function getEmbeds(cast: NeynarCast): Embeds {
  const embeds = cast?.embeds || [];
  const imgs = [];
  const videos = [];
  const ogs = [];
  const frames = [];
  const casts = [];

  for (const embed of embeds) {
    if (embed?.cast_id) {
      casts.push(embed.cast_id);
    } else if (embed?.url) {
      if (isImg(embed.url)) {
        imgs.push(embed);
      } else if (isVideo(embed.url)) {
        videos.push(embed);
      } else if (!!embed?.metadata?.html?.ogSiteName) {
        ogs.push(embed);
      } else if (
        (cast?.frames || [])?.length > 0 &&
        cast?.frames?.find((frame) => frame.frames_url === embed.url)
      ) {
        const frame = cast?.frames?.find(
          (frame) => frame.frames_url === embed.url
        );
        frames.push({
          metadata: frame!,
          url: embed.url,
        });
      }
    }
  }
  return { imgs, ogs, frames, casts, videos };
}
