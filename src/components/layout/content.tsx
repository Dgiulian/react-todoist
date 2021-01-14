import React from 'react';
import { Sidebar } from './sidebar';

interface Props {}

export const Content = (props: Props) => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};
