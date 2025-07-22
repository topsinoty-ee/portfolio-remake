import { type Model, model, models, Schema, type InferSchemaType, Types } from "mongoose";
// import { Project } from "./project";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    // parentComment: {
    //   type: Types.ObjectId,
    //   required: false,
    //   sparse: true,
    // },
  },
  {
    timestamps: true,
  },
);

export type CommentType = Omit<InferSchemaType<typeof CommentSchema>, "createdAt" | "updatedAt">;
export type CommentModel = Model<CommentType & { createdAt: NativeDate; updatedAt: NativeDate }>;

export const Comment: CommentModel = models.Comment ?? model("Comment", CommentSchema);

export const isValidComment = (Comment: unknown): Comment is CommentType => {
  if (
    Comment &&
    typeof Comment === "object" &&
    "content" in Comment &&
    "projectId" in Comment &&
    typeof Comment.content === "string" &&
    typeof Comment.projectId === "string" &&
    new Types.ObjectId(Comment.projectId)
  )
    return true;
  return false;
};
