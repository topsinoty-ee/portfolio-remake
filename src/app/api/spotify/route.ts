import { NextResponse } from "next/server";
import type { Track } from "~/app/components/nowPlaying";

export interface RecentTrackResponse {
  recenttracks: { track: Track[]; "@attr": { user: string } };
}

export async function GET() {
  const response = await fetch(
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=topsinoty&api_key=5567c519fb22b5203bdff414099a48ae&format=json&limit=1",
    {
      next: { revalidate: 15 },
    },
  );

  const json = (await response.json()) as RecentTrackResponse;

  const recent = json.recenttracks?.track?.[0];

  if (!recent) {
    return NextResponse.json({ error: "No recent track found" }, { status: 404 });
  }

  return NextResponse.json(recent);
}
