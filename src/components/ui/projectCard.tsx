"use client";
import { Building2, ExternalLink, User, Users } from "lucide-react";
import React, { memo, type FC } from "react";
import { Separator } from "./separator";
import { Button } from "./button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { format } from "date-fns";
import type { ProjectPublicDetails } from "~/types/project";
import { cn } from "~/lib/utils";

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const ProjectCard: FC<ProjectPublicDetails & { tagCount?: number; showFeatured?: boolean }> = memo(
  ({
    title,
    description,
    link,
    repo,
    for: forWho,
    skillsRequired,
    id,
    isFeatured,
    collaborators,
    updatedAt,
    tagCount = 4,
    showFeatured = false,
  }) => {
    const formattedDate = updatedAt ? format(new Date(updatedAt), "MMM dd, yyyy") : "-- / --";

    return (
      <div className="group relative mb-6 h-max break-inside-avoid">
        <div className="from-border/70 to-border/70 absolute -inset-0.5 rounded-xl bg-gradient-to-r opacity-0 blur transition-all duration-500 group-hover:opacity-100" />

        <div
          className={cn(
            "bg-card border-border hover:border-border relative overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md",
            {
              "bg-popover": showFeatured && isFeatured,
              "border-muted-foreground hover:border-muted-foreground": showFeatured && isFeatured,
              "border-secondary/20 hover:border-secondary/50 border-2": !showFeatured && !isFeatured,
            },
          )}
        >
          <Link href={`/projects/${id}`} className="hover:bg-secondary/5 block p-6 transition-all duration-300">
            <div className="mb-4">
              <h2 className="text-foreground mb-2 line-clamp-2 text-xl font-bold transition-colors duration-300">
                {title}
              </h2>
              <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{description}</p>
            </div>

            {skillsRequired && skillsRequired.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {skillsRequired.slice(0, tagCount).map((skill) => (
                    <span
                      key={skill}
                      className="bg-muted/50 text-foreground border-border hover:border-border/80 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {skillsRequired.length > tagCount && (
                    <span className="text-muted-foreground bg-muted/20 rounded-full px-3 py-1 text-xs">
                      +{skillsRequired.length - tagCount} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-4" />

            <div className="flex items-center justify-between gap-4">
              <div className="text-muted-foreground flex flex-1 items-center gap-4 text-xs">
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  {forWho ? (
                    <>
                      <Building2 className="size-3 shrink-0" />
                      <span className="ml-1 truncate overflow-hidden text-ellipsis">
                        {forWho}
                        {collaborators.length > 0 && (
                          <>
                            ({collaborators.length} collaborator
                            {collaborators.length === 1 ? "" : "s"})
                          </>
                        )}
                      </span>
                    </>
                  ) : collaborators.length > 0 ? (
                    <>
                      <Users className="size-3 shrink-0" />
                      <span className="ml-1 truncate overflow-hidden text-ellipsis">
                        {collaborators.length} collaborator
                        {collaborators.length === 1 ? "" : "s"}
                      </span>
                    </>
                  ) : (
                    <>
                      <User className="size-3 shrink-0" />
                      <span className="ml-1 truncate overflow-hidden text-ellipsis">Personal</span>
                    </>
                  )}
                </div>
                {formattedDate && (
                  <div className="flex shrink-0 items-center gap-1">
                    <span>{formattedDate}</span>
                  </div>
                )}
              </div>

              <div className="hidden items-center gap-2 lg:flex">
                {link && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openInNewTab(link);
                    }}
                    variant="ghost"
                    className="hover:bg-muted hover:text-foreground opacity-50 transition-all duration-300 group-hover:opacity-100"
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
                    className="hover:bg-muted hover:text-foreground opacity-50 transition-all duration-300 group-hover:opacity-100"
                    title="View source code"
                  >
                    <SiGithub className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
