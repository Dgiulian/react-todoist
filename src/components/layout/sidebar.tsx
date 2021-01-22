import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';
import { AddProject } from '../add-project';
import { Projects } from '../projects';
import { handleKeyDown } from '../../helpers';
export function Sidebar(): ReactElement {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);
  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          className={classnames({ inbox: true, active: active === 'inbox' })}
          data-testid="inbox"
        >
          <div
            role="button"
            data-testid="inbox-action"
            onClick={() => {
              setActive('inbox');
              setSelectedProject!('INBOX');
            }}
            onKeyDown={handleKeyDown(() => {
              setActive('inbox');
              setSelectedProject!('INBOX');
            })}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          className={classnames({ today: true, active: active === 'today' })}
          data-testid="today"
        >
          <div
            role="button"
            data-testid="today-action"
            onClick={() => {
              setActive('today');
              setSelectedProject!('TODAY');
            }}
            onKeyDown={handleKeyDown(() => {
              setActive('today');
              setSelectedProject!('TODAY');
            })}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          className={classnames({ next_7: true, active: active === 'next_7' })}
          data-testid="next_7"
        >
          <div
            data-testid="next_7-action"
            onClick={() => {
              setActive('next_7');
              setSelectedProject!('NEXT_7');
            }}
            onKeyDown={handleKeyDown(() => {
              setActive('next_7');
              setSelectedProject!('NEXT_7');
            })}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjects((show) => !show)}
        onKeyDown={handleKeyDown(() => setShowProjects((show) => !show))}
      >
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && <Projects activeValue={active} />}
      </ul>
      {showProjects && <AddProject shouldShow={false} />}
    </div>
  );
}
