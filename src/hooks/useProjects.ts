import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
interface Project {
  userId: string;
  docId: string;
}
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', '=(18IK')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        })) as Project[];
        if (
          JSON.stringify(allProjects, null, 2) !==
          JSON.stringify(projects, null, 2)
        ) {
          setProjects(allProjects);
        }
      });
    return () => {};
  }, [projects]);
};
