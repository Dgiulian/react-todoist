import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
import { isEqual } from 'lodash';
export interface Project {
  userId: string;
  docId: string;
  projectId: string;
  name: string;
}
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'b4a5qGa')
      .orderBy('projectId')
      .get()
      .then((snapshot: any) => {
        const allProjects = snapshot?.docs.map((project: any) => ({
          ...project.data(),
          docId: project.id,
        })) as Project[];
        if (!isEqual(allProjects, projects)) {
          console.log(JSON.stringify(allProjects), JSON.stringify(projects));
          setProjects(allProjects);
        }
      });
    return () => {};
  }, [projects]);
  return { projects, setProjects };
};
