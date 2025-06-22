import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from '@/lib/routes';
import { AuthProvider } from '@/providers/auth-provider';
import Loader from '@/features/components/loader';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
