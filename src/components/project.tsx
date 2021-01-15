import React, { useState } from 'react';
import { firebase } from '../firebase';
import { useProjectValues, useSelectedProjectValue } from '../context';
import { Project } from '../hooks';
import { FaTrashAlt } from 'react-icons/fa';
interface Props {
  project: Project;
}

const ProjectComponent = ({ project }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectValues();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId: string) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        if (projects && setProjects) setProjects([...projects]);
        if (setSelectedProject) setSelectedProject('INBOX');
      });
  };
  return (
    <div>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testId="delete-project"
        onClick={() => setShowConfirm(true)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <button type="button" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

export { ProjectComponent as Project };
