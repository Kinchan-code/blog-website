import { lazy } from 'react';

// This file is used to lazy load components for better performance
// and to avoid loading all components at once.

export const AuthPage = lazy(() => import('@/features/auth/page'));

export const Shell = lazy(() => import('@/features/post/page'));

export const SignUpPage = lazy(
  () => import('@/features/auth/pages/sign-up/page')
);

export const SignInPage = lazy(
  () => import('@/features/auth/pages/sign-in/page')
);

export const PostsPage = lazy(
  () => import('@/features/post/pages/posts-list/page')
);

export const CreatePost = lazy(
  () => import('@/features/post/pages/create-post/page')
);

export const ProfilePage = lazy(() => import('@/features/profile/page'));
