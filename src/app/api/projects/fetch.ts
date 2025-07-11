import type { Types } from "mongoose";
import { clientPromise } from "~/db";
import { Project, type ProjectType } from "~/db/models/project";
import { mapSlugToId } from "~/db/utils";

export async function fetchProjects() {
  try {
    await clientPromise;
    await Project.init();
    const projects: ProjectType[] = await Project.find({}).lean();
    return projects.map((project) => mapSlugToId(project));
  } catch (error) {
    throw new Error("Failed to fetch projects: " + (error instanceof Error ? error.message : String(error)));
  }
}

export async function createProject(projectData: Partial<ProjectType>) {
  try {
    await clientPromise;
    await Project.init();

    if (!projectData.slug) throw new Error("Project slug is required");
    if (!projectData.title) throw new Error("Project title is required");
    if (!projectData.description) throw new Error("Project description is required");
    if (!projectData.content) throw new Error("Project content is required");

    return await Project.insertOne(projectData);
  } catch (error) {
    throw new Error("Failed to create project: " + (error instanceof Error ? error.message : String(error)));
  }
}

export async function fetchFeaturedProjects() {
  try {
    await clientPromise;
    await Project.init();
    const projects = await Project.find({ isFeatured: true }).lean();
    return projects.map((project) => mapSlugToId(project));
  } catch (error) {
    throw new Error("Failed to fetch featured projects: " + (error instanceof Error ? error.message : String(error)));
  }
}

export async function fetchProjectBySlug(slug: string) {
  try {
    await clientPromise;
    await Project.init();

    const projectId = await Project.findOne<{ _id: Types.ObjectId }>(
      { slug },
      { collation: { locale: "en", strength: 2 } },
    );

    if (!projectId) {
      throw new Error(`Project with slug "${slug}" does not exist`);
    }

    const project = await Project.findById(projectId._id).lean<ProjectType>();

    if (!project) {
      throw new Error(`Project with ID "${projectId._id.toString()}" not found`);
    }

    return mapSlugToId(project);
  } catch (error) {
    throw new Error("Failed to fetch project by slug: " + (error instanceof Error ? error.message : String(error)));
  }
}

export async function updateProjectBySlug(slug: string, update: Partial<ProjectType>) {
  try {
    await clientPromise;
    await Project.init();

    const projectId = await Project.findOne<{ _id: Types.ObjectId }>(
      { slug },
      { collation: { locale: "en", strength: 2 } },
    );

    if (!projectId) {
      throw new Error(`Project with slug "${slug}" does not exist`);
    }

    const result = await Project.findByIdAndUpdate(projectId._id, update).lean<ProjectType>();
    return result;
  } catch (error) {
    throw new Error("Failed to fetch project by slug: " + (error instanceof Error ? error.message : String(error)));
  }
}
