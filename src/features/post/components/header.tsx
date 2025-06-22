import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/slices/authSlice';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const onCreatePost = () => {
    if (user) {
      navigate('/home/create-post');
    } else {
      navigate('/login');
    }
  };

  const onLogout = async () => {
    await dispatch(signOut());
    navigate('/');
  };

  return (
    <header className='flex h-full items-center justify-between p-4 bg-white '>
      <h1 className='text-sm sm:text-base md:text-xl lg:text-2xl font-bold'>
        Welcome
        <span className='font-normal'>{user ? `, ${user.email}` : ''}!</span>
      </h1>
      <section className='hidden sm:flex gap-4 items-center'>
        <Button onClick={onCreatePost}>Create Post</Button>
        <Button
          className='bg-green-500 text-white'
          variant='outline'
          onClick={() => navigate('/home/profile')}
        >
          Profile
        </Button>
        <Button
          variant='outline'
          className='bg-red-500 text-white'
          onClick={onLogout}
        >
          Logout
        </Button>
      </section>
      <section className='sm:hidden flex items-center'>
        <Drawer>
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerFooter>
              <DrawerClose>
                <Button className='w-full' onClick={onCreatePost}>
                  Create Post
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button
                  className='bg-green-500 text-white w-full'
                  variant='outline'
                  onClick={() => navigate('/home/profile')}
                >
                  Profile
                </Button>
              </DrawerClose>
              <Button
                variant='outline'
                className='bg-red-500 text-white'
                onClick={onLogout}
              >
                Logout
              </Button>
              <DrawerClose>
                <Button variant='outline' className='w-full'>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </header>
  );
}

export default Header;
