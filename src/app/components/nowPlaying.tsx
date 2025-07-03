"use client"; // Mark as Client Component

import { SiSpotify } from "@icons-pack/react-simple-icons";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export interface Track {
  artist: { "#text": string };
  name: string;
  url: string;
  "@attr"?: {
    nowPlaying: true;
  };
}

export const NowPlaying = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify");
        const track = (await res.json()) as Track;
        setTrack(track);
      } catch (error) {
        console.error("Failed to fetch track:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const intervalId = setInterval(() => {
      void fetchTrack();
    }, 10000);

    void fetchTrack();

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-muted/10 flex items-center gap-2.5 rounded-b-lg p-4 text-xs">
        <SiSpotify size={12} className="text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-muted/10 flex items-center gap-2.5 rounded-b-lg p-4 text-xs">
      <SiSpotify
        size={12}
        className={cn("text-primary", {
          "animate-[spin_2s_linear_infinite]": !track?.["@attr"]?.nowPlaying,
        })}
      />
      {isLoading ? (
        <span className="text-muted-foreground">Loading...</span>
      ) : track ? (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-primary underline underline-offset-2"
        >
          {track.artist["#text"]} — {track.name}
        </a>
      ) : (
        <span className="text-muted-foreground">Not playing anything rn</span>
      )}
    </div>
  );
};
