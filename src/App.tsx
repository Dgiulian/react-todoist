import React, { useState } from 'react';
import { Header } from './components/layout/header';

import './App.css';
import { Content } from './components/layout/content';
import { ProjectProvider, SelectedProjectProvider } from './context';
import classNames from 'classnames';
interface Props {
  darkModeDefault: boolean;
}

function App({ darkModeDefault = false }: Partial<Props>) {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  console.log(darkMode);
  return (
    <ProjectProvider>
      <SelectedProjectProvider>
        <main
          data-testid="application"
          className={classNames({ App: true, darkmode: darkMode })}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </SelectedProjectProvider>
    </ProjectProvider>
  );
}

export { App };
