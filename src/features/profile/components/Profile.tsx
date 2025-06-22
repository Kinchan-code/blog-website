import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserPosts from '@/features/profile/components/UserPosts';

function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const onGoBack = () => {
    navigate('/home');
  };

  if (!user) {
    return (
      <div className='flex items-center h-full justify-center p-8'>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1
        className='flex font-medium items-center gap-2 text-sm md:text-base lg:text-lg text-muted-foreground'
        onClick={onGoBack}
      >
        <ArrowLeft className='size-4 md:size-5' />
        Go back
      </h1>
      <h1 className='text-2xl font-bold mb-6 text-center'>Your Profile</h1>
      <Card className='h-full w-full '>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Mail className='size-5' />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <p className='text-lg'>{user.email}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                User ID
              </label>
              <p className='text-sm text-gray-500 break-all'>{user.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Posts Section */}
      <Card className='w-full'>
        <CardContent className='pt-6'>
          <UserPosts userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
