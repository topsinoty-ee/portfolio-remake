import { Building2, User, Users } from "lucide-react";
import { memo } from "react";
import { Separator } from "./separator";
import { format } from "date-fns";
import { ProjectCardActions, ProjectCardLink } from "./project-actions";
import { cn } from "~/lib/utils";
import type { Project } from "@prisma/client";

export type ProjectCardType = Omit<Project, "content" | "status"> & {
  showBanner?: boolean;
};

export const ProjectCard = memo(
  ({
    title,
    description,
    link,
    repo,
    slug,
    for: forWho,
    skillsUsed,
    contributorIds,
    lastUpdated,
    isFeatured,
    showBanner = true,
  }: ProjectCardType) => {
    const tagCount = 6;

    const formattedDate = lastUpdated ? format(lastUpdated, "MMM yyyy") : "-- / --";

    return (
      <div className="group relative mb-6 h-max break-inside-avoid">
        <div className="border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md">
          {isFeatured && (
            <>
              <div
                className={cn(
                  "from-secondary/50 via-primary to-primary/40 absolute inset-0 h-4 bg-gradient-to-r opacity-100 transition-opacity duration-300 group-hover:opacity-0",
                  { hidden: !showBanner },
                )}
              />
              <div
                className={cn(
                  "from-primary/40 via-secondary/50 to-primary absolute inset-0 h-4 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  { hidden: !showBanner },
                )}
              />
            </>
          )}
          <ProjectCardLink slug={slug}>
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-foreground mb-2 line-clamp-2 text-xl font-bold">{title}</h2>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{description}</p>
              </div>

              {skillsUsed && skillsUsed.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {skillsUsed.slice(0, tagCount).map((skill) => (
                      <span
                        key={skill}
                        className="border-border/30 bg-muted/50 hover:border-border text-foreground rounded-full border-2 px-3 py-1 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {skillsUsed.length > tagCount && (
                      <span className="bg-muted/20 text-muted-foreground rounded-full px-3 py-1 text-xs">
                        +{skillsUsed.length - tagCount} more
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
                        <span className="ml-1 truncate">
                          {forWho}
                          {contributorIds.length > 0 && (
                            <>
                              ({contributorIds.length} collaborator
                              {contributorIds.length === 1 ? "" : "s"})
                            </>
                          )}
                        </span>
                      </>
                    ) : contributorIds.length > 0 ? (
                      <>
                        <Users className="size-3 shrink-0" />
                        <span className="ml-1 truncate">
                          {contributorIds.length} collaborator
                          {contributorIds.length === 1 ? "" : "s"}
                        </span>
                      </>
                    ) : (
                      <>
                        <User className="size-3 shrink-0" />
                        <span className="ml-1 truncate">Personal</span>
                      </>
                    )}
                  </div>
                  {formattedDate && (
                    <div className="flex shrink-0 items-center gap-1">
                      <span>{formattedDate}</span>
                    </div>
                  )}
                </div>

                <ProjectCardActions link={link} repo={repo} />
              </div>
            </div>
          </ProjectCardLink>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
