import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string(),
  // createdAt: z.date(),
  updatedAt: z.date().optional(),
  link: z.string().optional(),
  repo: z.string().optional(),
  for: z.string().optional(),
  skillsRequired: z.array(z.string()),
  collaborators: z.array(z.string()).default([]),
  comments: z.array(z.string()).default([]),
  isArchived: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  // accessList: z.array(z.string()).optional(),
  lastUpdatedBy: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export type ProjectPublicDetails = Omit<Project, "comments" | "isArchived">;
export type ProjectPrivateDetails = Project;
