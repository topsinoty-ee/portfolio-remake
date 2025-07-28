"use client";
import { ExternalLink } from "lucide-react";
import { Button } from "./button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { cn } from "~/lib/utils";
import Link from "next/link";

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

interface ProjectCardActionsProps {
  link?: string | null;
  repo?: string | null;
  isFeatured?: boolean;
}

export const ProjectCardActions = ({ link, repo, isFeatured }: ProjectCardActionsProps) => {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      {link && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openInNewTab(link);
          }}
          variant="ghost"
          className={cn(
            "opacity-50 transition-all duration-300 group-hover:opacity-100",
            isFeatured
              ? "hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-950/30 dark:hover:text-purple-300"
              : "hover:bg-muted hover:text-foreground",
          )}
          title="View live demo"
        >
          <ExternalLink className="size-4" />
        </Button>
      )}
      {repo && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openInNewTab(repo);
          }}
          variant="ghost"
          className={cn(
            "opacity-50 transition-all duration-300 group-hover:opacity-100",
            isFeatured ? "hover:bg-primary/5 hover:text-secondary" : "hover:bg-muted hover:text-foreground",
          )}
          title="View source code"
        >
          <SiGithub className="size-4" />
        </Button>
      )}
    </div>
  );
};

interface ProjectCardLinkProps {
  slug: string;
  children: React.ReactNode;
}

export const ProjectCardLink = ({ slug, children }: ProjectCardLinkProps) => {
  return (
    <Link href={`/projects/${slug}`} className={cn("block transition-all duration-300", "hover:bg-secondary/5")}>
      {children}
    </Link>
  );
};
