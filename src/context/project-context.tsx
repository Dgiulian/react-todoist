import React, { createContext, FC, useContext } from 'react';
import { Project, useProjects } from '../hooks';

type IProjectProvider = {
  projects: Project[] | null;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>> | null;
};
export const ProjectContext = createContext<IProjectProvider>({
  projects: null,
  setProjects: null,
});

export const ProjectProvider: FC = ({ children }) => {
  const { projects, setProjects } = useProjects();
  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectValues = () => useContext(ProjectContext);
