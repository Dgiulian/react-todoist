import React, { createContext, FC, useContext, useState } from 'react';

interface ISelectedProjectProvider {
  selectedProject: string | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>> | undefined;
}
const SelectedProjectContext = createContext<ISelectedProjectProvider>({
  selectedProject: null,
  setSelectedProject: undefined,
});

export const SelectedProjectProvider: FC = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<string>('INBOX');

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
