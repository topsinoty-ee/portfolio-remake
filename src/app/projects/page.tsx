// import { ProjectCard } from "./components/card";
import { List } from "./components/list";
import { fetchProjects } from "~/app/api/projects/fetch";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return (
    <section className="flex h-full w-full flex-col justify-center gap-8">
      <div>
        <h1 className="text-primary text-5xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-4 text-lg">Here are some of the projects I have worked on.</p>
      </div>
      <div className="md:h-min-screen w-full">
        <List projects={projects} />
      </div>
    </section>
  );
}
