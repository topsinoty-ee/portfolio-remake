interface Project {
    id: string;
    title: string;
    description: string;
    link?: string;
    repo?: string;
    for?: string;
    skillsRequired: string[];
    collaborators: string[];
}
export interface ProjectPublicDetails extends Project {
    isFeatured?: boolean;
    updatedAt?: Date;
}

export interface ProjectPrivateDetails  extends ProjectPublicDetails{
  createdAt: Date;
  accessList: string[];
  comments: string[];
  isArchived: boolean;
}