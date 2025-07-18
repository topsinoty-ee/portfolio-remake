"use client";

import type { ProjectPublicDetails } from "~/types/project";
import { ProjectCard } from "~/components/ui/projectCard";

export const List = ({ projects }: { projects: ProjectPublicDetails[] }) => (
  <div className="columns-1 gap-6 space-y-6 sm:columns-2">
    {projects.map((project) => (
      <div key={project.id} className="break-inside-avoid">
        <ProjectCard tagCount={6} showFeatured {...project} />
      </div>
    ))}
  </div>
);
