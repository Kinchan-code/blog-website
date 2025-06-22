import { Loader as Loading } from 'lucide-react';

function DataLoader() {
  return (
    <main className='h-full flex items-center gap-4 justify-center'>
      <Loading className='animate-spin' />
      <p className='text-sm md:text-base lg:text-lg font-medium'>
        Loading data please wait...
      </p>
    </main>
  );
}

export default DataLoader;
