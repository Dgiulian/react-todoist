import { addDays, format } from 'date-fns';
import React, { Dispatch, SetStateAction } from 'react';
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa';
import { handleKeyDown } from '../helpers';

interface Props {
  setTaskDate: Dispatch<SetStateAction<string>>;
  showTaskDate: boolean;
  setShowTaskDate: Dispatch<SetStateAction<boolean>>;
}

export const TaskDate = ({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
}: Props) => {
  if (!showTaskDate) return null;
  return (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li>
          <div
            data-testid="task-date-today"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(format(new Date(), 'yyyy-mm-dd'));
            }}
            onKeyDown={handleKeyDown(() => {
              setShowTaskDate(false);
              setTaskDate(format(new Date(), 'yyyy-mm-dd'));
            })}
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li>
          <div
            data-testid="task-date-tomorrow"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(format(addDays(new Date(), 1), 'yyyy-mm-dd'));
            }}
            onKeyDown={handleKeyDown(() => {
              setShowTaskDate(false);
              setTaskDate(format(addDays(new Date(), 1), 'yyyy-mm-dd'));
            })}
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li>
          <div
            data-testid="task-date-next-week"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(format(addDays(new Date(), 7), 'yyyy-mm-dd'));
            }}
            onKeyDown={handleKeyDown(() => {
              setShowTaskDate(false);
              setTaskDate(format(addDays(new Date(), 7), 'yyyy-mm-dd'));
            })}
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
