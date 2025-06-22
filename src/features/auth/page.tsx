import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function Page() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which tab should be active based on the current path
  const isSignup = location.pathname === '/signup';
  const tabValue = isSignup ? 'signup' : 'signin';

  return (
    <main className='h-screen w-full flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold'>
            Welcome to Blog APP
          </CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tabValue} className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='signin' onClick={() => navigate('/')}>
                Sign In
              </TabsTrigger>
              <TabsTrigger value='signup' onClick={() => navigate('/signup')}>
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value={tabValue}>
              <Outlet />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;
