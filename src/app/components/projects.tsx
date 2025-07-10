"use client";

// import { TriangleAlert } from "lucide-react";
// import { Alert, AlertDescription } from "../ui/alert";
// import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
// import { Alert, AlertDescription } from "~/components/ui/alert";
import { ProjectCard } from "~/components/ui/projectCard";
import type { ProjectPublicDetails } from "~/types/project";

export const ProjectsList = () => {
  const [projects, setProjects] = useState<ProjectPublicDetails[]>([]);
  const [, setError] = useState<string | null>(null);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects/featured");
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        setProjects(
          (await res.json().then((res: { projects: ProjectPublicDetails }) => res.projects)) as ProjectPublicDetails[],
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    const intervalId = setInterval(() => {
      void fetchProjects();
    }, 10000);

    void fetchProjects();

    return () => clearInterval(intervalId);
  }, []);

  if (!projects?.length) {
    return <div className="text-muted-foreground">No projects found</div>;
  }

  return (
    <div className="grid h-full w-full grid-cols-1 gap-10 lg:grid-cols-2">
      {projects.map((project) => {
        return <ProjectCard tagCount={4} {...project} key={project.id} />;
      })}
    </div>
  );
};
