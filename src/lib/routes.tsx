import { createBrowserRouter } from 'react-router-dom';
import {
  AuthPage,
  CreatePost,
  PostsPage,
  ProfilePage,
  Shell,
  SignInPage,
  SignUpPage,
} from '@/lib/lazy';
import Loader from '@/features/components/loader';

export const routes = createBrowserRouter(
  [
    {
      id: 'auth',
      path: '/',
      element: <AuthPage />,
      children: [
        {
          id: 'login',
          index: true,
          // This is the login page that will be rendered when the user navigates to /login
          element: <SignInPage />,
        },
        {
          id: 'signup',
          path: 'signup',
          element: <SignUpPage />,
        },
      ],
    },
    {
      id: 'root',
      path: '/home',
      element: <Shell />,
      children: [
        {
          id: 'posts',
          index: true,
          // This is the main page that will be rendered when the user navigates to /home
          element: <PostsPage />,
        },
        {
          id: 'create-post',
          path: 'create-post',
          // This is the create post page that will be rendered when the user navigates to /create-post
          element: <CreatePost />,
        },
        {
          id: 'profile',
          path: 'profile',
          // This is the profile page that will be rendered when the user navigates to /profile
          element: <ProfilePage />,
        },
      ],
    },
  ],
  {
    hydrationData: {
      loaderData: {
        root: <Loader />,
      },
    },
  }
);
