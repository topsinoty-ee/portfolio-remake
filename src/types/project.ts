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
  content: string;
  isFeatured?: boolean;
  updatedAt?: Date;
}

export interface ProjectPrivateDetails extends ProjectPublicDetails {
  // createdAt: Date;
  comments: string[];
  isArchived: boolean;
}

/**
 *  id
    title
    content
    createdAt
    updatedAt
    collaborators
    description
    link
    repo
    skillsRequired
    isArchived
    comments
    accessList
    for
    isFeatured
    lastUpdatedBy
 */
