"use client";
import { SiSpotify } from "@icons-pack/react-simple-icons";
import useSWR from "swr";
import { cn } from "~/lib/utils";

export interface Track {
  artist: { "#text": string };
  name: string;
  url: string;
  "@attr"?: {
    nowplaying?: boolean; // Last.fm uses lowercase
  };
}

const fetcher = async (url: string): Promise<Track> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch track");
  return res.json() as Promise<Track>;
};

export function NowPlaying() {
  const {
    data: track,
    error,
    isLoading,
  } = useSWR<Track>("/api/spotify", fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
    onErrorRetry: (error) => {
      if (error.message.includes("404")) return;
    },
  });

  const isPlaying = track?.["@attr"]?.nowplaying;
  const showTrack = track?.name && track.artist?.["#text"];

  return (
    <div className="bg-muted/40 flex items-center gap-2.5 rounded-b-lg p-4 text-xs">
      <SiSpotify
        size={12}
        className={cn("text-primary", {
          "animate-spin": isPlaying,
          "text-destructive": error,
        })}
      />

      <div className="min-w-[180px]">
        {error ? (
          <span className="text-destructive">Failed to load</span>
        ) : isLoading ? (
          <span className="text-muted-foreground">Loading...</span>
        ) : showTrack ? (
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-primary underline underline-offset-2"
          >
            {track.artist["#text"]} &bull; {track.name}
          </a>
        ) : (
          <span className="text-muted-foreground">Not playing</span>
        )}
      </div>
    </div>
  );
}
