import React, { useState } from 'react';
import { firebase } from '../firebase';
import { useProjectValues, useSelectedProjectValue } from '../context';
import { Project } from '../hooks';
import { FaTrashAlt } from 'react-icons/fa';
import { handleKeyDown } from '../helpers';
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
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">
        {showConfirm}
        {project.name}
      </span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(true)}
        onKeyDown={handleKeyDown(() => setShowConfirm(true))}
      >
        <FaTrashAlt />
      </span>
      {showConfirm && (
        <div className="project-delete-modal">
          <div className="project-delete-modal__inner">
            <p>Are you sure you want to delete this project?</p>
            <button
              type="button"
              className="accept"
              onClick={() => deleteProject(project.docId)}
            >
              Delete
            </button>
            <button
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                setShowConfirm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { ProjectComponent as Project };
