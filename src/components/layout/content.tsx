import React from 'react';
import { Tasks } from '../tasks';
import { Sidebar } from './sidebar';

interface Props {}

export const Content = (props: Props) => {
  return (
    <div>
      <Sidebar />
      <Tasks />
    </div>
  );
};
