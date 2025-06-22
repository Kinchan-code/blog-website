// src/pages/Signup.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '@/slices/authSlice';
import type { RootState, AppDispatch } from '@/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import {
  signupSchema,
  type AuthFormValues,
} from '@/features/auth/schema/signup-schema';

function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState('');
  const auth = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setServerMessage('');
    const result = await dispatch(
      signUp({ email: data.email, password: data.password })
    );
    if (signUp.fulfilled.match(result)) {
      navigate('/', { replace: true });
    } else if (signUp.rejected.match(result)) {
      setServerMessage((result.payload as string) || 'Sign up failed');
    } else {
      setServerMessage('Check your email to confirm your account.');
    }
  };

  return (
    <div className='max-w-md mx-auto p-4 space-y-4 '>
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
        <div className='flex flex-col gap-4'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            placeholder='Confirm Password'
            type='password'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-sm text-red-500'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type='submit' className='w-full' disabled={auth.loading}>
          {auth.loading ? (
            <div className='flex gap-2'>
              <Loader className='animate-spin' />
              <p>Signing up...</p>
            </div>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>
      <p className='text-center text-sm'>
        Already have an account?{' '}
        <Button variant='link' onClick={() => navigate('/login')}>
          Login
        </Button>
      </p>
      {serverMessage && (
        <p className='text-center text-sm text-red-500'>{serverMessage}</p>
      )}
    </div>
  );
}

export default Signup;
