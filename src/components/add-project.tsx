import React, { useState } from 'react';
import { useProjectValues } from '../context';
import { generatePushId } from '../helpers';
import { firebase } from '../firebase';
interface Props {
  shouldShow: boolean;
}

export const AddProject = ({ shouldShow }: Props) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const projectId = generatePushId();
  const { setProjects } = useProjectValues();
  const addProject = () => {
    if (projectName) {
      firebase
        .firestore()
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: 'b4a5qGa',
        })
        .then(() => {
          setProjects!([]);
          setProjectName('');
          setShow(false);
        });
    }
  };
  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            data-testid="add-project-submit"
            onClick={() => addProject()}
          >
            Add
          </button>
          <button
            className="add-project__cancel"
            type="button"
            data-testid="add-project-cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="add-project__btn" onClick={() => setShow(!show)}>
        <span data-testid="add-project-plus" className="add-project__plus">
          +
        </span>
        <span data-testid="add-project-action" className="add-project__text">
          Add Project
        </span>
      </div>
    </div>
  );
};
