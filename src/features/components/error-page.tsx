import type { ErrorPageProps } from '@/features/types/error-types';

function ErrorPage({ message }: ErrorPageProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>
        Oops! Something went wrong.
      </h1>
      <p className='text-lg text-gray-700 mb-8'>
        {message ||
          'The page you are looking for does not exist or an unexpected error has occurred.'}
      </p>
      <a href='/' className='text-blue-500 hover:underline'>
        Go back to Home
      </a>
    </div>
  );
}

export default ErrorPage;
