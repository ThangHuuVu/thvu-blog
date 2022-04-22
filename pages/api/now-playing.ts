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

  const nowPlaying = await response.json();
  if (nowPlaying.currently_playing_type === "track") {
    // song
    const isPlaying = nowPlaying.is_playing;
    const title = nowPlaying.item.name;
    const artist = nowPlaying.item.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(", ");
    const songUrl = nowPlaying.item.external_urls.spotify;

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
    return res.status(200).json({
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } else if (nowPlaying.currently_playing_type === "episode") {
    // podcast
    return res.status(200).json({
      isPlaying: nowPlaying.is_playing,
      songUrl: "https://open.spotify.com",
      title: "Podcast",
    });
  }
}

export default withSentry(handler);
