// import type { CommentType } from "~/db/models/comment";

// type CommentListProps = {
//   comments: CommentType[];
//   currentUserId?: string;
// };

// export const CommentList = ({ comments }: CommentListProps) => {
//   if (comments.length === 0) {
//     return (
//       <div className="border-muted text-muted-foreground flex h-32 items-center justify-center rounded-md border border-dashed p-4 text-sm italic">
//         No comments yet. Be the first to comment!
//       </div>
//     );
//   }

//   return (
//     <ul className="space-y-4">
//       {comments.map((comment, index) => (
//         <li
//           key={index}
//           className="border-border bg-background rounded-xl border p-4 shadow-sm transition-shadow hover:shadow"
//         >
//           <div className="flex items-start justify-between">
//             <div className="space-y-1">
//               <p className="text-foreground text-sm">{comment.content}</p>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };
