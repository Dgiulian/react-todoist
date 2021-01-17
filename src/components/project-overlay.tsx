import React, { Dispatch, SetStateAction } from 'react';
import { useProjectValues } from '../context';

interface Props {
  setProject: Dispatch<SetStateAction<string>>;
  showProjectOverlay: boolean;
  setShowProjectOverlay: Dispatch<SetStateAction<boolean>>;
}

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}: Props) => {
  const { projects } = useProjectValues();
  if (!projects || !showProjectOverlay) return null;
  return (
    <div className="project-overlay" data-testid="project-overlay">
      <ul className="project-overlay__list">
        {projects.map((project) => (
          <li
            key={project.projectId}
            data-testid="project-overlay-action"
            onClick={() => setProject(project.projectId)}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
