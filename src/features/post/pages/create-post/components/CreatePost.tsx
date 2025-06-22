// src/components/NewPost.tsx
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '@/slices/postsSlice';
import type { AppDispatch, RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPostSchema,
  type CreatePostFormValues,
} from '@/features/post/pages/create-post/schema/create-post-schema';
import { Toaster } from '@/components/ui/sonner';
import { toast } from '@/components/ui/toast';

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.posts);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', content: '' },
  });

  const onGoBack = () => {
    navigate('/home');
  };

  const onSubmit = async (data: CreatePostFormValues) => {
    try {
      await dispatch(createPost(data)).unwrap();
      toast.success('Post created successfully!');
      reset();
    } catch {
      toast.error('Failed to create post.');
    }
  };

  return (
    <main className='flex flex-col gap-4'>
      <Toaster />
      <h1
        className='flex font-medium items-center gap-2 text-sm md:text-base lg:text-lg text-muted-foreground'
        onClick={onGoBack}
      >
        <ArrowLeft className='size-4 md:size-5' />
        Go back
      </h1>
      <h1 className='text-lg font-bold md:text-xl'>Create Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 p-4 bg-white rounded shadow'
      >
        <div className='flex flex-col gap-2'>
          <Label className='block text-sm font-medium text-gray-700'>
            Title
          </Label>
          <Input
            type='text'
            {...register('title')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            placeholder='Your post title'
          />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='block text-sm font-medium text-gray-700'>
            Content
          </Label>
          <Textarea
            {...register('content')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            placeholder='Your post content'
            rows={5}
          />
          {errors.content && (
            <p className='text-sm text-red-500'>{errors.content.message}</p>
          )}
        </div>
        <div className='md:justify-end flex w-full'>
          <Button
            type='submit'
            className='w-full md:w-auto text-white px-4 py-2 rounded'
            disabled={loading}
          >
            {loading ? (
              <div className='flex gap-2'>
                <Loader className='animate-spin' />
                <p>Creating...</p>
              </div>
            ) : (
              'Create Post'
            )}
          </Button>
        </div>
        {error && (
          <p className='text-sm text-red-500 text-center mt-2'>{error}</p>
        )}
      </form>
    </main>
  );
}

export default CreatePost;
