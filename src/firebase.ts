import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'react-todoist-8db4c',
  storageBucket: 'react-todoist-8db4c.appspot.com',
  messagingSenderId: '211957909920',
  appId: process.env.REACT_APP_FIREBASE_APPID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp as firebase };
