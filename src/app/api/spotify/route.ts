import { NextResponse } from "next/server";
import type { Track } from "~/app/components/nowPlaying";

export interface RecentTrackResponse {
  recenttracks: { track: Track[]; "@attr": { user: string } };
}

export const revalidate = 6000;

export async function GET() {
  const data = await fetch(
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=topsinoty&api_key=5567c519fb22b5203bdff414099a48ae&format=json&limit=1",
    {
      next: { revalidate: 100 },
    },
  );
  const recent: RecentTrackResponse = (await data.json()) as RecentTrackResponse;
  return NextResponse.json(recent.recenttracks.track?.[0]);
}
