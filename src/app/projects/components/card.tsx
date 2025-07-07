import { Building2, ExternalLink, Star, User, Users } from "lucide-react";
import React, { memo, type FC } from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { format } from "date-fns";
import type { ProjectPublicDetails } from "~/types/project";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const ProjectCard: FC<ProjectPublicDetails> = memo(
  ({ title, description, link, repo, for: forWho, skillsRequired, id, isFeatured, collaborators, updatedAt }) => {
    const formattedDate = updatedAt ? format(new Date(updatedAt), "MMM dd, yyyy") : "-- / --";

    return (
      <div className="group relative break-inside-avoid">
        <div className="from-border/70 to-border/70 absolute -inset-0.5 rounded-xl bg-gradient-to-r opacity-0 blur transition-all duration-500 group-hover:opacity-100" />

        <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
          <div
            className={`bg-primary flex h-0 items-center justify-end overflow-hidden px-4 opacity-0 transition-all duration-500 ease-in-out group-hover:h-12 group-hover:opacity-100`}
          >
            {link && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openInNewTab(link);
                }}
                variant="ghost"
                className="opacity-60 transition-opacity duration-300 ease-in-out group-hover:opacity-100 hover:bg-transparent"
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
                className="opacity-60 transition-opacity duration-300 ease-in-out group-hover:opacity-100 hover:bg-transparent"
                title="View source code"
              >
                <SiGithub className="size-4" />
              </Button>
            )}
          </div>

          <Link href={`/projects/${id}`} className="hover:bg-secondary/5 block p-6 transition-all duration-300">
            <div className="mb-4">
              <h2 className="text-foreground mb-2 line-clamp-2 inline-flex items-baseline text-xl font-bold transition-colors duration-300">
                {title}
                {isFeatured && (
                  <div>
                    <Button variant={"ghost"} className="size-4 opacity-60 transition-all duration-300">
                      <Star className="size-4 fill-current" />
                    </Button>
                  </div>
                )}
              </h2>
              <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{description}</p>
            </div>

            {skillsRequired && skillsRequired.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {skillsRequired.slice(0, 7).map((skill) => (
                    <span
                      key={skill}
                      className="bg-muted/50 text-foreground border-border hover:border-border/80 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {skillsRequired.length > 7 && (
                    <span className="text-muted-foreground bg-muted/20 rounded-full px-3 py-1 text-xs">
                      +{skillsRequired.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-4" />

            <div className="flex items-center justify-between gap-4">
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  {forWho ? (
                    <>
                      <Building2 className="size-3 shrink-0" />
                      <span className="ml-1 truncate overflow-hidden text-ellipsis">
                        {forWho}{" "}
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
            </div>
          </Link>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
