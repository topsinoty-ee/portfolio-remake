import Link from "next/link";
import { Calendar, Users, Tag, GitBranch, Building2, ArrowLeft, Edit2, Clock, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { auth } from "~/auth";
import { env } from "~/env";
import { db } from "~/db";
import { notFound } from "next/navigation";
import { cn } from "~/lib/utils";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const [project, session] = await Promise.all([
      db.project.findUnique({
        where: {
          slug: await params.then((p) => p.slug),
        },
      }),
      auth(),
    ]);

    if (!project) {
      return notFound();
    }

    const formatDate = (date?: string | Date) => {
      if (!date) return "N/A";
      const d = typeof date === "string" ? new Date(date) : date;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "active":
          return "bg-primary/10 text-primary border-primary/20";
        case "in_progress":
          return "bg-secondary/10 text-secondary-foreground border-secondary/20";
        case "planning":
          return "bg-secondary/10 text-secondary-foreground border-secondary/20";
        case "under_maintenance":
          return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
        case "might_circle_back":
          return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
        case "dead":
          return "bg-destructive/10 text-destructive border-destructive/20";
        default:
          return "bg-muted text-muted-foreground border-border";
      }
    };

    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-7xl py-6 sm:py-8 lg:px-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
            <Button variant="ghost" size="sm" asChild className="gap-2 self-start">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Projects</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>

            {session?.user && session?.user.email === env.ADMIN_EMAIL && (
              <Button variant="outline" size="sm" asChild className="gap-2 self-start sm:self-auto">
                <Link href={`/projects/${project.slug}/edit`}>
                  <Edit2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Project</span>
                  <span className="sm:hidden">Edit</span>
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-4 xl:grid-cols-3">
            <div className="space-y-6 sm:space-y-8 lg:col-span-3 xl:col-span-2">
              <article className="space-y-6 sm:space-y-8">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-xl border p-6 shadow-sm sm:p-8",
                    project.isFeatured
                      ? "from-card/95 via-card to-card/95 border-secondary/30 bg-gradient-to-br"
                      : "bg-card border-border",
                  )}
                >
                  {project.isFeatured && (
                    <>
                      <div
                        className={
                          "from-secondary via-secondary to-primary absolute top-0 right-0 left-0 h-1 bg-gradient-to-r not-sm:hidden"
                        }
                      />
                      <div className="absolute top-4 right-4 not-sm:hidden">
                        <Badge className="from-secondary to-secondary text-secondary-foreground border-0 bg-gradient-to-r">
                          Featured
                        </Badge>
                      </div>
                    </>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    <h1
                      className={cn(
                        "text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl",
                        project.isFeatured
                          ? "from-secondary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent"
                          : "text-foreground",
                      )}
                    >
                      {project.title}
                    </h1>
                    {project.isFeatured && (
                      <>
                        <div
                          className={
                            "from-secondary via-secondary to-primary absolute top-0 right-0 left-0 h-1 bg-gradient-to-r"
                          }
                        />
                        <div className="-mt-2">
                          <Badge className="from-secondary to-secondary text-secondary-foreground border-0 bg-gradient-to-r">
                            Featured
                          </Badge>
                        </div>
                      </>
                    )}

                    {project.description && (
                      <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                        {project.description}
                      </p>
                    )}

                    <div className="flex flex-col flex-wrap gap-3 pt-2 sm:flex-row sm:pt-4">
                      {project.link && (
                        <Button asChild className="w-full gap-2 sm:w-auto">
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4" />
                            View Live
                          </Link>
                        </Button>
                      )}
                      {project.repo && (
                        <Button variant="outline" asChild className="w-full gap-2 sm:w-auto">
                          <Link href={project.repo} target="_blank" rel="noopener noreferrer">
                            <GitBranch className="h-4 w-4" />
                            Source Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:bg-card sm:border-border py-6 sm:rounded-xl sm:border sm:p-8 sm:shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">About This Project</h2>
                  <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl prose-gray dark:prose-invert max-w-none">
                    {project.content ? (
                      project.content.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="text-foreground mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-muted-foreground italic">
                        No detailed description available for this project yet.
                      </p>
                    )}
                  </div>
                </div>

                {project.skillsUsed && project.skillsUsed.length > 0 && (
                  <div className="sm:bg-card sm:border-border py-6 sm:rounded-xl sm:border sm:p-8 sm:shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold sm:mb-6 sm:text-2xl">
                      <Tag className="h-5 w-5" />
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {project.skillsUsed.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={cn(
                            "px-3 py-1 text-sm",
                            project.isFeatured && "bg-secondary/10 text-secondary border-secondary/20",
                          )}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <div className="bg-card border-border rounded-xl border p-6 shadow-sm not-sm:hidden sm:p-8">
                <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">Comments</h2>
                <div className="text-muted-foreground py-8 text-center">
                  <p className="text-sm sm:text-base">Comments section coming soon...</p>
                </div>
                {/* This is where the Comments component will go */}
                {/* <Comments projectId={project.id} /> */}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 lg:col-span-1 xl:col-span-1">
              <div className="bg-card border-border rounded-xl border p-4 shadow-sm sm:p-6">
                <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Project Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  {project.for && (
                    <div className="flex items-start gap-3">
                      <Building2 className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground text-xs sm:text-sm">Client/Organization</p>
                        <p className="text-sm font-medium break-words sm:text-base">{project.for}</p>
                      </div>
                    </div>
                  )}

                  {project.lastUpdated && (
                    <div className="flex items-start gap-3">
                      <Calendar className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground text-xs sm:text-sm">Last Updated</p>
                        <p className="text-sm font-medium sm:text-base">{formatDate(project.lastUpdated)}</p>
                      </div>
                    </div>
                  )}

                  {project.contributorIds && project.contributorIds.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Users className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground text-xs sm:text-sm">Contributors</p>
                        <p className="text-sm font-medium sm:text-base">
                          {project.contributorIds.length} contributor{project.contributorIds.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.status && (
                    <div className="flex items-start gap-3">
                      <Clock className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground text-xs sm:text-sm">Status</p>
                        <Badge className={cn("mt-1 text-xs", getStatusColor(project.status))}>
                          {project.status.replace(/_/g, " ").toLowerCase()}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.isFeatured && (
                <div className="from-secondary/5 via-secondary/5 to-primary/5 border-secondary/20 rounded-xl border bg-gradient-to-br p-4 not-sm:hidden sm:p-6">
                  <div className="text-center">
                    <div className="from-secondary to-secondary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r sm:h-12 sm:w-12">
                      <Tag className="text-secondary-foreground h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-secondary mb-2 text-sm font-semibold sm:text-base">Featured Project</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      This project has been highlighted as one of the standout works in the portfolio.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-card border-border rounded-xl border p-6 shadow-sm sm:hidden sm:p-8">
              <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">Comments</h2>
              <div className="text-muted-foreground py-8 text-center">
                <p className="text-sm sm:text-base">Comments section coming soon...</p>
              </div>
              {/* This is where the Comments component will go */}
              {/* <Comments projectId={project.id} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error("Error loading project:", e);
    return notFound();
  }
}

export const revalidate = 60;
