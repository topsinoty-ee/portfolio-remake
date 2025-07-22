"use server";

import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createComment } from "~/app/api/comments/fetch";
import type { CommentType } from "~/db/models/comment";
import { Project } from "~/db/models/project";

export async function addComment<T extends CommentType>(comment: T) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { content, projectId: slug } = comment;

  const project = await Project.findOne({ slug });
  if (!project) {
    throw new Error(`Cannot find project with slug:${slug}`);
  }
  const { _id: projectId } = project;

  if (!content || (typeof content === "string" && content.trim().length === 0)) {
    throw new Error("Comment content is required");
  }

  try {
    // Add your database logic here
    // Example:
    // await db.comment.create({
    //   data: {
    //     content: content.trim(),
    //     userId: session.user.id,
    //     // Add other required fields like postId, etc.
    //   }
    // });

    await createComment({
      ...comment,
      projectId,
    });

    // Revalidate the page to show the new comment
    revalidatePath("/");
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}

export async function deleteComment(commentId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  try {
    // Add your database logic here
    // Example:
    // const comment = await db.comment.findUnique({
    //   where: { id: commentId },
    //   select: { userId: true }
    // });

    // if (!comment || comment.userId !== session.user.id) {
    //   throw new Error("Unauthorized");
    // }

    // await db.comment.delete({
    //   where: { id: commentId }
    // });

    console.log("Deleting comment:", commentId);
    console.log("User:", session.user.email);

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}
