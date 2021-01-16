import React, { useEffect } from 'react';
import { useTasks } from '../hooks';
import { Checkbox } from './checkbox';
import { getTitle, getCollatedTitle, collatedTasksExists } from '../helpers';
import { useSelectedProjectValue, useProjectValues } from '../context';
import { collatedTasks } from '../constants';
interface Props {}
export const Tasks = (props: Props) => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectValues();
  const { tasks } = useTasks(selectedProject);
  let projectName = '';
  if (projects && selectedProject && !collatedTasksExists(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }
  if (selectedProject && collatedTasksExists(selectedProject)) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }
  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
