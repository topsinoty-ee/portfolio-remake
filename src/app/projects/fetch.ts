"use server";
import { env } from "~/env";
import type { ProjectPrivateDetails, ProjectPublicDetails } from "~/types/project";

export const fetchProjects = async () => {
  try {
    console.log("Fetching projects from API:", env.WEBSITE);
    const res = await fetch(`${env.WEBSITE}/api/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch projects");

    const { projects } = (await res.json()) as {
      projects: ProjectPublicDetails[];
    };
    return projects;
  } catch (err) {
    throw err instanceof Error ? err : new Error("An error occurred");
  }
};

export const fetchProject = async (slug: string) => {
  try {
    console.log("Fetching project from API:", env.WEBSITE);
    const res = await fetch(`${env.WEBSITE}/api/projects/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch project");

    const { project } = (await res.json()) as {
      project: ProjectPrivateDetails;
    };
    return project;
  } catch (err) {
    throw err instanceof Error ? err : new Error("An error occurred");
  }
};
