import { SiSpotify } from "@icons-pack/react-simple-icons";
import ky from "ky";
import { cn } from "~/lib/utils";

export interface Track {
  artist: { "#text": string };
  name: string;
  url: string;
  "@attr"?: {
    nowPlaying: true;
  };
}

async function getRecentTrack() {
  return await ky.get("http://localhost:3000/api/spotify").json<Track>();
}
const track = await getRecentTrack();
export const NowPlaying = () => {
  return (
    <div className="bg-muted/10 flex items-center gap-2.5 rounded-b-lg p-4 text-xs">
      <SiSpotify
        size={12}
        className={cn("text-primary", { "animate-[spin_1.85s_linear_infinite]": !track["@attr"]?.nowPlaying })}
      />
      {track ? (
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

  /**
   *
   * const { track, loading } = useNowPlaying();

  if (loading) return <div className="bg-muted/10 flex items-center gap-2.5 rounded-b-lg p-4 text-xs" />;

  return (
    <div className="bg-muted/10 flex items-center gap-2.5 rounded-b-lg p-4 text-xs">
      <SiSpotify size={12} className={cn({ "animate-[spin_1.85s_linear_infinite]": !!track })} />
      {track ? (
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
   */
};
