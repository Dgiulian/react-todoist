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
          onClick={() => {
            setActive('inbox');
            setSelectedProject!('INBOX');
          }}
        >
          <div>
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          className={classnames({ today: true, active: active === 'today' })}
          data-testid="today"
          onClick={() => {
            setActive('today');
            setSelectedProject!('TODAY');
          }}
        >
          <div>
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          className={classnames({ next_7: true, active: active === 'next_7' })}
          data-testid="next_7"
          onClick={() => {
            setActive('next_7');
            setSelectedProject!('NEXT_7');
          }}
        >
          <div>
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
      >
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && <Projects activeValue={active} />}
      </ul>
      {showProjects && <AddProject />}
    </div>
  );
}
