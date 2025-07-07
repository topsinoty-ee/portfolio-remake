import type { ObjectId } from "mongoose";
import { clientPromise } from "~/db";
import { Project, type ProjectType } from "~/db/models/project";
import { mapSlugToId } from "~/db/utils";

export async function fetchProjects() {
  await clientPromise;
  await Project.init();

  const projects: ProjectType[] = await Project.find({}).lean();
  return projects.map((project) => mapSlugToId(project));
}

export async function createProject(projectData: Partial<ProjectType>) {
  await clientPromise;
  await Project.init();
  if (!projectData.slug) {
    throw new Error("Project slug is required");
  }
  if (!projectData.title) {
    throw new Error("Project title is required");
  }
  if (!projectData.description) {
    throw new Error("Project description is required");
  }
  if (!projectData.content) {
    throw new Error("Project content is required");
  }

  return await Project.insertOne(projectData);
}

export async function fetchFeaturedProjects() {
  await clientPromise;
  await Project.init();

  const projects = await Project.find({ isFeatured: true }).lean();
  return projects.map((project) => mapSlugToId(project));
}

export async function fetchProjectBySlug(slug: string) {
  await clientPromise;
  await Project.init();

  const projectId = await Project.findOne<{ _id: ObjectId }>(
    { slug },
    {
      collation: { locale: "en", strength: 2 },
    },
  );

  if (!projectId) {
    throw new Error("Project does not exist");
  }
  const project = await Project.findById(projectId._id).lean<ProjectType>();

  if (!project) {
    throw new Error("Project not found");
  }
  return mapSlugToId(project);
}
