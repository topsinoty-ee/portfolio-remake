import Link from "next/link";
// import { fetchProjectBySlug, fetchProjects } from "~/app/api/projects/fetch";
import { Calendar, ExternalLink, Users, Tag, GitBranch, Building2, ArrowLeft, Edit2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { auth } from "~/auth";
import { env } from "~/env";
// import { Comments } from "./components/comments";
// import { fetchComments } from "~/app/api/comments/fetch";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = await params.then((p) => p.slug);
  const project: Record<string, string> = {}; //await fetchProjectBySlug(slug);
  const session = await auth();

  const formatDate = (date?: string | Date) => {
    if (!date) return "N/A";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const comments: Record<string, string | string[] | Record<string, string>>[] = []; //await fetchComments(slug);

  return (
    <div className="min-h-screen">
      <div className="flex gap-8">
        <div className="flex flex-col gap-24">
          <article className="lg:border-border lg:bg-card h-max flex-1 lg:rounded-lg lg:border lg:shadow-sm">
            <div className="py-6 lg:px-8">
              <div className="mb-4 flex flex-col items-start justify-between">
                <div className="mb-4 flex w-full items-center justify-between lg:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-card w-max justify-start rounded-lg border p-4 shadow-sm lg:hidden"
                  >
                    <Link href="/projects" className="inline-flex items-center gap-2">
                      <ArrowLeft className="size-4" />
                    </Link>
                  </Button>
                  {project.isFeatured && (
                    <div className="">
                      <Badge variant="secondary">featured</Badge>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-primary mb-3 text-2xl leading-tight font-bold sm:text-3xl">{project.title}</h1>
                  <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">{project.description}</p>
                </div>
              </div>

              {/* Mobile Skills (show on mobile, hide on desktop) */}
              {project.skillsRequired && project.skillsRequired.length > 0 && (
                <div className="mb-4 lg:hidden">
                  <div className="flex flex-wrap gap-2">
                    {/* {project.skillsRequired.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))} */}
                    {project.skillsRequired.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.skillsRequired.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm sm:gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Updated {formatDate(project.updatedAt)}</span>
                  <span className="sm:hidden">{formatDate(project.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{project.for}</span>
                </div>
                {project.collaborators && project.collaborators.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {project.collaborators.length} collaborator{project.collaborators.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                {project.isArchived && (
                  <Badge variant="outline" className="text-xs">
                    Archived
                  </Badge>
                )}
              </div>
            </div>
            <Separator className="my-4" />

            {/* Content */}
            <div className="py-6 lg:px-8">
              <div className="prose lg:prose-lg max-w-none">
                {/* {project.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-foreground mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))} */}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="py-6 lg:px-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                  {project.link && (
                    <Button
                      variant="outline"
                      className="bg-secondary text-secondary-foreground transition-color"
                      asChild
                    >
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </Link>
                    </Button>
                  )}
                  {project.repo && (
                    <Button variant="outline" asChild>
                      <Link
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <GitBranch className="h-4 w-4" />
                        View Code
                      </Link>
                    </Button>
                  )}
                </div>
                {/* Mobile collaborators preview */}
                {project.collaborators && project.collaborators.length > 0 && (
                  <div className="bg-card flex w-full items-center gap-2 rounded-md p-4 lg:hidden">
                    <span className="text-muted-foreground text-sm font-bold">Collaborators:</span>
                    <div className="flex -space-x-2">
                      {/* {project.collaborators.slice(0, 4).map((collaborator, index) => (
                        <div
                          key={index}
                          className="from-primary/40 to-accent/60 text-foreground ring-background flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-medium ring-2"
                        >
                          {collaborator.charAt(0).toUpperCase()}
                        </div>
                      ))} */}
                    </div>
                    {project.collaborators.length > 4 && (
                      <span className="text-muted-foreground text-sm">+{project.collaborators.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
          {/* <Comments
            // comments={comments.map((c) => {
            //   const { _id, ...rest } = c;
            //   return { _id: _id.toJSON(), ...rest };
            // })}
            slug={slug}
            userId={!!session ? session.user?.id : undefined}
          /> */}
        </div>

        {/* Sidebar */}
        <aside className="hidden min-w-80 space-y-6 lg:block">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-card w-full justify-start rounded-lg border p-4 shadow-sm"
          >
            <Link href="/projects" className="inline-flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </Button>
          {session?.user && session?.user.email === env.ADMIN_EMAIL && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-card w-full justify-start rounded-lg border p-4 shadow-sm"
            >
              <Link href={`/projects/${slug}/edit`} className="inline-flex items-center gap-2">
                <Edit2 className="size-4" />
                Edit Project
              </Link>
            </Button>
          )}

          {/* Skills Required */}
          {project.skillsRequired && project.skillsRequired.length > 0 && (
            <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-card-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
                <Tag className="h-5 w-5" />
                Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {/* {project.skillsRequired.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))} */}
              </div>
            </div>
          )}

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-card-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
                <Users className="h-5 w-5" />
                Collaborators
              </h3>
              <div className="space-y-3">
                {/* {project.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="from-primary/40 to-accent/60 text-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-medium">
                      {collaborator.charAt(0).toUpperCase()}
                    </div>
                    <Link className="text-card-foreground hover:text-primary font-medium transition-colors" href="#">
                      {collaborator}
                    </Link>
                  </div>
                ))} */}
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="text-card-foreground mb-4 text-lg font-semibold">Project Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Made for</span>
                <span className="text-card-foreground font-medium">{project.for}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-card-foreground font-medium">{formatDate(project.updatedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium ${project.isArchived ? "text-destructive" : "text-primary"}`}>
                  {project.isArchived ? "Archived" : "Active"}
                </span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          {/* <div className="rounded-lg border border-chart-1 bg-gradient-to-r from-chart-1/50 to-chart-3/50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Interested in collaborating?</h3>
            <p className="mb-4 text-sm text-gray-600">
              This project is looking for contributors with the skills listed above. Join the team and help make it even
              better!
            </p>
            <button className="w-full rounded-md bg-blue-600  py-2 font-medium text-white transition-colors hover:bg-blue-700">
              Get Involved
            </button>
          </div> */}
        </aside>
      </div>
    </div>
  );
}

export const revalidate = 60;

// export async function generateStaticParams() {
//   const projects = await fetchProjects();
//   return projects.map((project) => ({
//     slug: project.id,
//   }));
// }
