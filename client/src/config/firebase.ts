import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBTMnVFlqLKSOQsl7aK4-_8Q4CPkgg5Myw',
  authDomain: 'github-yadu.firebaseapp.com',
  projectId: 'github-yadu',
  storageBucket: 'github-yadu.firebasestorage.app',
  messagingSenderId: '780707325332',
  appId: '1:780707325332:web:27eeb63b8b9e2c9bb99b81',
  measurementId: 'G-EEVD6QY656',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
export default app;
