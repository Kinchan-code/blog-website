import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '@/features/auth/schema/auth-schema';
import type { AuthFormValues } from '@/features/auth/schema/auth-schema';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '@/slices/authSlice';
import type { RootState, AppDispatch } from '@/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const auth = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setServerError('');
    const result = await dispatch(signIn(data));
    if (signIn.fulfilled.match(result)) {
      navigate('/home', { replace: true });
    } else if (signIn.rejected.match(result)) {
      setServerError((result.payload as string) || 'Login failed');
    }
  };

  return (
    <div className='max-w-md mx-auto p-4 flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            placeholder='Enter Email Address'
            type='email'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            placeholder='Enter Password'
            type='password'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-sm text-red-500'>{errors.password.message}</p>
          )}
        </div>
        <Button type='submit' className='w-full' disabled={auth.loading}>
          {auth.loading ? (
            <div className='flex gap-2'>
              <Loader className='animate-spin' />
              <p>Logging in...</p>
            </div>
          ) : (
            'Log in'
          )}
        </Button>
      </form>
      <p className='text-center text-sm'>
        Don&apos;t have an account?{' '}
        <Button variant='link' onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </p>
      {serverError && (
        <p className='text-center text-sm text-red-500'>{serverError}</p>
      )}
    </div>
  );
}
