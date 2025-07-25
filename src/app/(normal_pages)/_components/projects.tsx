import { ProjectCard } from "~/components/ui/projectCard";
// import { fetchProjects } from "../../api/projects/fetch";

export const revalidate = 10;

export async function ProjectsList() {
  try {
    const projects: Record<string, string>[] = []; //await fetchProjects();
    const featuredProjects = projects.filter((project) => project.isFeatured);

    return (
      <div className="grid h-full w-full grid-cols-1 gap-10 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard tagCount={4} {...project} key={project.id} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return <div className="text-destructive">Failed to load projects.</div>;
  }
}
