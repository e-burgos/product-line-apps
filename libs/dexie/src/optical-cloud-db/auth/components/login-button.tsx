import Button from 'libs/ui/src/components/button';
import { LogIn } from 'lucide-react';
import { LoginModal } from './login-modal';
import { useAuthStore } from '../hooks/use-auth-store';
import { useInitCloudDB } from '../hooks/use-init-cloud-db';

export const LoginButton = () => {
  const { setOpenLoginModal } = useAuthStore();
  const { login } = useInitCloudDB();

  const handleLogin = () => {
    setOpenLoginModal(true);
    login();
  };

  return (
    <>
      <Button
        variant="solid"
        shape="rounded"
        size="medium"
        onClick={handleLogin}
      >
        <div className="flex items-center">
          <LogIn className={'h-4 w-4 mr-2'} />
          {'Ingresar'}
        </div>
      </Button>
      <LoginModal />
    </>
  );
};

export default LoginButton;
