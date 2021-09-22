import { getNowPlaying } from "@/lib/spotify";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

export interface NowPlayingSong {
  isPlaying: boolean;
  artist?: string;
  songUrl?: string;
  title?: string;
}

async function handler(_: NextApiRequest, res: NextApiResponse<NowPlayingSong>) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const songUrl = song.item.external_urls.spotify;

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
  return res.status(200).json({
    artist,
    isPlaying,
    songUrl,
    title,
  });
}

export default withSentry(handler);
