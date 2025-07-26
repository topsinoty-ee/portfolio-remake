import { ProjectCard } from "~/components/ui/projectCard";
import { db } from "~/db";

export async function ProjectsList() {
  try {
    const projects = await db.project.findMany({
      where: {
        isFeatured: true,
      },
    });

    return (
      <div className="grid h-full w-full grid-cols-1 gap-10 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard {...project} key={project.id} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return <div className="text-destructive">Failed to load projects.</div>;
  }
}
