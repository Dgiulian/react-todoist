import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { format, addDays } from 'date-fns';
import classNames from 'classnames';

interface Props {
  showAddTaskMain: boolean;
  showShouldMain: boolean;
  showQuickAddTask: boolean;
  setShowQuickAddTask: (v: boolean) => void;
}

export const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask = false,
  setShowQuickAddTask = (v) => {},
}: Props) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showShouldMain);
  const [showPojectOverlay, setShowPojectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const { selectedProject } = useSelectedProjectValue();
  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';
    if (projectId === 'TODAY') {
      collatedDate = format(new Date(), 'yyyy-mm-dd');
    } else if (project === 'NEXT_7') {
      collatedDate = format(addDays(new Date(), 7), 'yyyy-mm-dd');
    }
    if (task && projectId) {
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'b4a5qGa',
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain(false);
          setShowPojectOverlay(false);
        });
    }
  };
  return (
    <div
      className={classNames({
        'add-task': true,
        'add-task-overlay': showQuickAddTask,
      })}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header"> Quick add task</h2>
                <span
                  className="data-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowPojectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  X
                </span>
              </div>
            </>
          )}
          <input
            type="text"
            className="add-task__content"
            data-testid="data-test-content"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() => {
              addTask();
              if (showQuickAddTask) {
                setShowQuickAddTask(false);
              }
            }}
          >
            Add task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowPojectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowPojectOverlay(!setShowPojectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-project-overlay"
            onClick={() => setShowTaskDate(!setShowTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
