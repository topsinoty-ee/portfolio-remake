// "use client";

// import { Plus } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import { toast } from "sonner";
// import z from "zod";
// import { BetterForm } from "~/components/ui/betterForm";
// import { Button } from "~/components/ui/button";
// import { SectionHeader } from "~/components/ui/sectionHeader";
// import { LoginButton } from "~/lib/auth/components";
// // import { addComment } from "./server";
// // import type { CommentType } from "~/db/models/comment";
// import { CommentList } from "./list";

// export const Comments = ({
//   comments,
//   slug,
//   userId,
// }: {
//   slug: string;
//   userId: string | undefined;
//   comments: CommentType[];
// }) => {
//   const { status } = useSession();
//   const [isAddingComment, setIsAddingComment] = useState(false);

//   const CommentForm = () => {
//     return (
//       <BetterForm
//         formSchema={z.object({
//           comment: z.string().min(3),
//         })}
//         fields={[
//           {
//             name: "comment",
//             type: "textarea",
//             placeholder: "Any thoughts?",
//           },
//         ]}
//         onSubmit={async function (values) {
//           try {
//             await addComment({
//               content: values.comment,
//               projectId: slug,
//             });
//             setIsAddingComment(false);
//           } catch (error) {
//             toast.error("Error adding comment " + String(error));
//           }
//         }}
//       />
//       /**
//        *
//        * action={async (formData) => {
//           try {
//             await addComment(formData);
//             setIsAddingComment(false);
//           } catch (error) {
//             console.error("Failed to add comment:", error);
//           }
//         }}
//        */
//     );
//   };

//   const CommentButton = () => {
//     return (
//       <Button onClick={() => setIsAddingComment(true)}>
//         <Plus className="h-4 w-4" />
//         Add Comment
//       </Button>
//     );
//   };

//   const ActionButton = () => {
//     if (status !== "authenticated") return <LoginButton provider="github" />;
//     return <CommentButton />;
//   };

//   return (
//     <section className="lg:border-border lg:bg-card flex-1 p-6 lg:rounded-lg lg:border lg:shadow-sm">
//       <div className="flex w-full items-center justify-between">
//         <SectionHeader>Comments</SectionHeader>
//         {!isAddingComment && <ActionButton />}
//       </div>

//       {isAddingComment && <CommentForm />}

//       <div className="mt-6">
//         <CommentList comments={comments} currentUserId={userId} />
//       </div>
//     </section>
//   );
// };
