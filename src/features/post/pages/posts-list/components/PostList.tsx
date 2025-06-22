import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/slices/postsSlice';
import type { Post } from '@/slices/postsSlice';
import { Card } from '@/components/ui/card';
import type { AppDispatch, RootState } from '@/store';
import DataLoader from '@/features/components/data-loader';
import ErrorPage from '@/features/components/error-page';

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <DataLoader />;
  if (error) return <ErrorPage />;

  if (posts.length === 0) {
    return (
      <section className='flex h-full items-center justify-center text-muted-foreground'>
        No posts available.
      </section>
    );
  }

  return (
    <main className='h-full w-full flex flex-col gap-6 p-4'>
      <h1 className='text-lg font-bold md:text-xl '>Posts</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {posts.map((post: Post) => (
          <Card key={post.id} className='p-4 space-y-2'>
            <h2 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>
              {post.title}
            </h2>
            <p className='text-xs sm:text-sm md:text-base lg:text-lg'>
              {post.content}
            </p>
            <div className='flex flex-col gap-1 text-xs sm:text-sm text-gray-500'>
              <p>By: {post.author_email || 'Unknown Author'}</p>
              <p>{new Date(post.created_at).toLocaleString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
