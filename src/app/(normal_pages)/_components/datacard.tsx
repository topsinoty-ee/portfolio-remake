"use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { NowPlaying } from "./nowPlaying";
import { toast } from "sonner";
import React from "react";
import Link from "next/link";

const data = {
  currentAffairs: ["Ricing my PC", "Playing w/ SvelteKit & Java"],
  stackBias: ["React + TypeScript + TailwindCSS", "Next.js App Router", "pnpm + shadcn/ui + custom tooling"],
  timeline: {
    availability: "Available",
    contact: {
      email: "oluwatobilobatemi05",
      phone: "(+372) 5445 0982",
    },
  },
};

export const DataCard = () => {
  const [copiedToClipboard, setCopiedToClipboard] = React.useState(false);
  const copyProfileToClipboard = () => {
    if (!copiedToClipboard) {
      navigator.clipboard
        .writeText(
          `🧠 Promise - Frontend Dev + Tooling Architect\n` +
            `🌍 Tallinn, Estonia | Remote-ready\n\n` +
            `💻 React (TS) • Next.js 15 • TailwindCSS\n` +
            `📫 ${data.timeline.contact.email} | github: @topsinoty-ee | https://topsinoty.vercel.app`,
        )
        .then(() => {
          setCopiedToClipboard(true);
          setTimeout(() => setCopiedToClipboard(false), 5000);
        })
        .catch(() => {
          toast.error("Failed to copy user profile");
        });
    }
  };

  return (
    <div className="font-jets flex h-full w-full flex-col overflow-hidden rounded-2xl font-light">
      <div className="border-accent/50 bg-muted/40 flex h-10 w-full items-center justify-between border-b">
        <div className="flex items-center gap-2 px-4">
          {["destructive", "secondary", "primary"].map((color) => (
            <div key={color} className={`size-3 rounded-full bg-${color}`} />
          ))}
        </div>
        <div className="[&_span]:hidden [&_span]:lg:inline">
          <Button asChild title="My CV" variant="ghost" className="rounded-none px-4 text-xs">
            <Link href="/promise_temitope.pdf" target="_blank" rel="noopener noreferrer">
              💼 <span>My CV</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={copyProfileToClipboard}
            className={cn(
              "hover:bg-muted/80 dark:hover:text-foreground hover:text-muted-foreground rounded-none rounded-tr-2xl px-4 text-xs transition-all duration-500",
              {
                "bg-muted/20 cursor-not-allowed": copiedToClipboard,
              },
            )}
          >
            {!copiedToClipboard ? (
              <>
                📋<span> Copy My Details</span>
              </>
            ) : (
              <>
                ✔️ <span>Copied!</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="shadow-card flex grow flex-col gap-2 text-sm shadow-sm transition-transform">
        <div className="bg-muted/40 flex flex-col gap-1 p-4">
          <span className="text-primary font-medium">🚧 Current Affairs</span>
          {data.currentAffairs.map((item, idx) => (
            <span key={idx}>- {item}</span>
          ))}
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="bg-muted/40 shadow-card flex flex-col gap-1 p-4 shadow-sm sm:rounded-r-lg">
            <span className="text-primary font-medium">🛠️ Stack Bias</span>
            {data.stackBias.map((item, idx) => (
              <span key={idx}>- {item}</span>
            ))}
          </div>

          <div className="bg-muted/40 shadow-card flex flex-col gap-1 p-4 shadow-sm md:rounded-l-lg">
            <span className="text-primary font-medium">📅 Timeline</span>
            <span>{data.timeline.availability}</span>
            <div className="*:[&_a:hover]:text-secondary mt-1 flex flex-col gap-0.5">
              <span className="text-primary font-medium">📫 Contact</span>
              <a href={`mailto:${data.timeline.contact.email}@gmail.com`} className="text-accent">
                {data.timeline.contact.email}
              </a>
              <a href={`tel:${data.timeline.contact.phone.replace(/\s/g, "")}`} className="text-accent">
                {data.timeline.contact.phone}
              </a>
            </div>
          </div>
        </div>

        <NowPlaying />
      </div>
    </div>
  );
};
