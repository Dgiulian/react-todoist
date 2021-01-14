import React from 'react';
import { Header } from './components/layout/header';

import './App.css';
import { Content } from './components/layout/content';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export { App };
