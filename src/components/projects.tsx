import React, { ReactElement, useState } from 'react';
import { useProjectValues, useSelectedProjectValue } from '../context';
import { handleKeyDown } from '../helpers';
import { Project } from './project';

interface Props {
  activeValue: string;
}

export function Projects({ activeValue }: Props): ReactElement {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectValues();

  return (
    <>
      {projects &&
        projects.map((project) => (
          <li
            key={project.projectId}
            data-doc-id={project.docId}
            data-testid="project-action-parent"
            className={
              active === project.projectId
                ? 'active sidebar__project'
                : 'sidebar__project'
            }
          >
            <button
              data-testid="project-action"
              onClick={() => {
                setActive(project.projectId);
                if (setSelectedProject) setSelectedProject(project.projectId);
              }}
              onKeyDown={handleKeyDown(() => {
                setActive(project.projectId);
                if (setSelectedProject) setSelectedProject(project.projectId);
              })}
            >
              <Project project={project} />
            </button>
          </li>
        ))}
    </>
  );
}
