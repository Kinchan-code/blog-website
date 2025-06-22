import { useAuth } from '@/context/use-auth';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '@/features/post/components/header';

function AppShell() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className='p-4'>Loading...</div>;
  }

  // Redirect to login if no session
  if (!session) {
    return <Navigate to='/' replace />;
  }

  return (
    <main className='flex flex-col h-screen gap-4 bg-gray-100 '>
      <header className='h-[10%] bg-white'>
        <Header />
      </header>
      <section className='flex-1 overflow-y-auto p-6 text-black'>
        <Outlet />
      </section>
    </main>
  );
}

export default AppShell;
