import { type Model, model, models, Schema, type InferSchemaType } from "mongoose";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    collation: { locale: "en", strength: 2 },
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    collation: { locale: "en", strength: 2 },
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    default: "",
  },
  repo: {
    type: String,
    default: "",
  },
  for: {
    type: String,
    default: "",
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  collaborators: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  // lastUpdatedBy: {
  //   type: String,
  //   default: "",
  // },
});

export type ProjectType = InferSchemaType<typeof ProjectSchema>;
export type ProjectModel = Model<ProjectType>;

export const Project: ProjectModel = models.Project ?? model("Project", ProjectSchema);

export const isValidProject = (project: unknown): project is ProjectType => {
  if (
    project &&
    typeof project === "object" &&
    "slug" in project &&
    "title" in project &&
    "description" in project &&
    "content" in project &&
    typeof project.slug === "string" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    typeof project.content === "string"
  )
    return true;
  return false;
};
