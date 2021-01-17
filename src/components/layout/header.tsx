import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
interface Props {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}
export const Header = ({ darkMode, setDarkMode }: Props) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="todoist" />
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-action" className="settings__add">
              +
            </li>
            <li
              data-testid="dark-mode-action"
              className="settings__darkmode"
              onClick={() => setDarkMode(!darkMode)}
              onKeyDown={(e) => e.key === 'ENTER' && setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
