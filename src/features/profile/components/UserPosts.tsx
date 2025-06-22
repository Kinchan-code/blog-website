import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '@/slices/postsSlice';
import type { Post } from '@/slices/postsSlice';
import { Card } from '@/components/ui/card';
import type { AppDispatch, RootState } from '@/store';
import DataLoader from '@/features/components/data-loader';

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { userPosts, userPostsLoading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts(userId));
    }
  }, [dispatch, userId]);

  if (userPostsLoading) return <DataLoader />;
  if (error) return <p className='text-red-500 text-center'>{error}</p>;

  if (userPosts.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>You haven't created any posts yet.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Your Posts ({userPosts.length})</h3>
      <div className='grid gap-4'>
        {userPosts.map((post: Post) => (
          <Card key={post.id} className='p-4'>
            <div className='flex justify-between items-start mb-2'>
              <h4 className='font-semibold text-lg'>{post.title}</h4>
            </div>
            <p className='text-gray-700 mb-3'>{post.content}</p>
            <div className='text-sm text-gray-500'>
              <p>Created: {new Date(post.created_at).toLocaleString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
