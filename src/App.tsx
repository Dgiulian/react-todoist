import React from 'react';
import { Header } from './components/layout/header';

import './App.css';
import { Content } from './components/layout/content';
import { ProjectProvider, SelectedProjectProvider } from './context';

function App() {
  return (
    <ProjectProvider>
      <SelectedProjectProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </SelectedProjectProvider>
    </ProjectProvider>
  );
}

export { App };
