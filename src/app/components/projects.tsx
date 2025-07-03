// import { TriangleAlert } from "lucide-react";
// import { Alert, AlertDescription } from "../ui/alert";
import { ProjectCard } from "~/components/ui/projectCard";
import type { ProjectPublicDetails } from "~/types/project";

export const ProjectsList = () => {
  // TODO add db or fetch point
  // Simulating data fetching
  const data: { projects: ProjectPublicDetails[] } = {
    projects: [
      {
        id: "1234",
        title: "test 1",
        description: "testing shit out",
        skillsRequired: [],
        collaborators: [],
        isFeatured: true,
        updatedAt: new Date(),
      },
      {
        id: "1235",
        title: "test 2",
        description: "testing shit out",
        skillsRequired: [],
        collaborators: [],
        isFeatured: true,
        updatedAt: new Date(),
      },
      {
        id: "1236",
        title: "test 3",
        description: "testing shit out",
        skillsRequired: [],
        collaborators: [],
        isFeatured: true,
        updatedAt: new Date(),
      },
      {
        id: "1237",
        title: "test 4",
        description: "testing shit out",
        skillsRequired: [],
        collaborators: [],
        isFeatured: true,
        updatedAt: new Date(),
      },
    ],
  };
  //   const error = Error("Failed to load projects");
  //   if (error) {
  //     return (
  //       <Alert variant="destructive">
  //         <TriangleAlert className="h-4 w-4" />
  //         <AlertDescription>
  //           Failed to load projects: {error.message}
  //         </AlertDescription>
  //       </Alert>
  //     );
  //   }

  if (!data?.projects?.length) {
    return <div className="text-muted-foreground">No projects found</div>;
  }

  return (
    <div className="grid h-full w-full grid-cols-1 gap-10 md:grid-cols-2">
      {data.projects.map((project) => {
        return <ProjectCard {...project} key={project.id} isFeatured />;
      })}
    </div>
  );
};
