import { collatedTasks } from '../constants';

export const collatedTasksExists = (selectedProject: string): boolean =>
  !!collatedTasks.find((task) => task.key === selectedProject);
