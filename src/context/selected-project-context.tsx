import React, { createContext, FC, useContext, useState } from 'react';

interface ISelectedProjectProvider {
  selectedProject: String;
  setSelectedProject: React.Dispatch<React.SetStateAction<String>>;
}
const SelectedProjectContext = createContext<ISelectedProjectProvider | null>(
  null
);

export const SelectedProjectProvider: FC = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<String>('INBOX');

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
