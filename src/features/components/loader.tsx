import { Loader as Loading } from 'lucide-react';

function Loader() {
  return (
    <main className='h-screen flex items-center gap-4 justify-center'>
      <Loading className='animate-spin' />
      <p className='text-sm md:text-base lg:text-lg font-medium'>
        Loading please wait...
      </p>
    </main>
  );
}

export default Loader;
