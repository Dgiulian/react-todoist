import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { format, differenceInDays, parse } from 'date-fns';
import { collatedTasksExists } from '../utils';

export interface Task {
  id: string;
  date: string;
  task: string;
  archived: boolean;
}
export const useTasks = (selectedProject: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'L?KK1');

    if (selectedProject && !collatedTasksExists(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where(
        'date',
        '==',
        format(new Date(), 'yyyy-MM-dd')
      );
    } else {
      if (selectedProject === 'INBOX' || selectedProject === '') {
        unsubscribe.where('date', '==', '');
      }
    }
    unsubscribe.onSnapshot((snapshot) => {
      const newTasks: Task[] = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      })) as Task[];
      let filteredTasks;
      if (selectedProject === 'NEXT_7') {
        filteredTasks = newTasks.filter(
          (task: Task) =>
            differenceInDays(
              new Date(),
              parse(task.date, 'yyyy-mm-dd', new Date())
            ) < 7 && !task.archived
        );
      } else {
        filteredTasks = newTasks.filter((task: Task) => !task.archived);
      }
      setTasks(filteredTasks);
      setArchivedTasks(newTasks.filter((task) => task.archived));
    });
    // TODO: unsubscribe when unmount
    // return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);
  return { tasks, archivedTasks };
};
