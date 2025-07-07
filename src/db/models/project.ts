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

const exampleProject: ProjectType = {
  title: "Example Project",
  slug: "example-project",
  content: "This is an example project.",
  description: "An example project for demonstration purposes.",
  updatedAt: new Date(),
  link: "https://example.com",
  repo: "",
  for: "Everyone",
  skillsRequired: ["JavaScript", "React"],
  collaborators: ["Alice", "Bob"],
  comments: [],
  isArchived: false,
  isFeatured: false,
  // lastUpdatedBy: "Alice",
};
