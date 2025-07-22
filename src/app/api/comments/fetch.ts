import { clientPromise } from "~/db";
import { Comment, type CommentType } from "~/db/models/comment";
import { Project } from "~/db/models/project";

export async function fetchComments(slug: string) {
  try {
    await clientPromise;
    await Comment.init();

    try {
      await Project.init();
      try {
        const proj = await Project.findOne({ slug }).lean();
        if (!proj) {
          throw new Error(`No project found with project slug: ${slug}`);
        }
        return await Comment.find({
          projectId: proj._id,
        }).lean();
      } catch (e) {
        throw e instanceof Error ? e : new Error(String(e));
      }

      return [];
    } catch (e) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  } catch (error) {
    throw new Error("Failed to fetch comments" + (error instanceof Error ? error.message : String(error)));
  }
}

export async function createComment(commentData: CommentType) {
  try {
    await clientPromise;
    await Comment.init();

    const { projectId } = commentData;
    if (!projectId) {
      throw new Error("No project id found");
    }
    try {
      await Project.init();
      const proj = await Project.findById(projectId);
      if (!proj) {
        throw new Error(`No project found with project id: ${projectId}`);
      }
    } catch (e) {
      throw e instanceof Error ? e : new Error(String(e));
    }
    return await Comment.insertOne(commentData);
  } catch (e) {
    throw new Error("Failed to create new commentData" + (e instanceof Error ? e.message : String(e)));
  }
}
