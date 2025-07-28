import { db } from "~/db";
import { ProjectCard } from "~/components/ui/projectCard";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { ReloadWindowButton } from "~/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default async function ProjectsPage() {
  try {
    const projects = await db.project.findMany({
      orderBy: { lastUpdated: "desc" },
    });

    return (
      <section className="flex h-full min-h-[calc(90vh-6rem)] w-full flex-col gap-12 py-10 md:py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-primary text-5xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-4 text-lg">Here are some of the projects I have worked on.</p>
        </div>

        <div className="w-full">
          <div className="columns-1 gap-6 [column-fill:balance] lg:columns-2 xl:columns-3">
            {projects.map((project) => (
              <div key={project.id} className="mb-6 break-inside-avoid">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-muted-foreground mb-4 text-lg">No projects found.</div>
              <p className="text-muted-foreground text-sm">Check back later for updates!</p>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="flex min-h-[60vh] justify-center">
        <Alert variant="destructive" className="flex w-full items-center justify-between self-center">
          <div className="flex gap-3">
            <TriangleAlert className="text-destructive mt-1 h-5 w-5" />
            <div className="flex flex-col">
              <AlertTitle className="text-base font-semibold">Failed to load projects</AlertTitle>
              <AlertDescription className="text-muted-foreground mt-1 text-sm">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred while trying to load your projects."}
              </AlertDescription>
            </div>
          </div>

          <div className="-mt-4 flex justify-end">
            <ReloadWindowButton />
          </div>
        </Alert>
      </div>
    );
  }
}

export const revalidate = 30;
