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
  const handleSelectProject = (projectId: string) => {
    setProject(projectId);
    setShowProjectOverlay(false);
  };
  if (!projects || !showProjectOverlay) return null;
  return (
    <div className="project-overlay" data-testid="project-overlay">
      <ul className="project-overlay__list">
        {projects.map((project) => (
          <li key={project.projectId}>
            <div
              data-testid="project-overlay-action"
              onClick={() => handleSelectProject(project.projectId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSelectProject(project.projectId);
                }
              }}
            >
              {project.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
