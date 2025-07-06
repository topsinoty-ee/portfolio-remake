import { ProjectCard } from "./components/card";
import { fetchProjects } from "./fetchProjects";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return (
    <section className="flex h-full w-full flex-col justify-center gap-8">
      <div>
        <h1 className="text-primary text-5xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-4 text-lg">Here are some of the projects I have worked on.</p>
      </div>
      <div className="md:h-min-screen w-full">
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {projects.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
