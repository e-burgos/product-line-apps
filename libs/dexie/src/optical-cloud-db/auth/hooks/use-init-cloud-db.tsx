import { useObservable } from 'dexie-react-hooks';
import { db } from '../../db';
import { useToastStore } from 'libs/ui/src/hooks';
import { useCallback } from 'react';
import { useAuthStore } from './use-auth-store';

export const useInitCloudDB = () => {
  const { addToast } = useToastStore();
  const { setOpenLoginModal } = useAuthStore();

  const login = useCallback(async () => {
    try {
      await db.cloud.login();
      addToast({
        id: 'authenticated',
        title: 'Autenticado',
        message: 'Usuario autenticado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error('login:', error);
      addToast({
        id: 'authentication-error',
        title: 'Contactar al Administrador',
        message:
          'No se pudo autenticar, es posible que el usuario no esté autorizado.',
        variant: 'destructive',
        timeout: 10000,
      });
      setOpenLoginModal(false);
      return { isSuccess: false, isError: true };
    }
  }, [addToast, setOpenLoginModal]);

  const logout = useCallback(async () => {
    try {
      await db.cloud.logout();
      console.log('Sessión cerrada.');
      addToast({
        id: 'logged-out',
        title: 'Sesión cerrada',
        message: 'Se ha cerrado la sesión.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'logout-error',
        title: 'Error',
        message: 'No se pudo cerrar la sesión.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  }, [addToast]);

  const ui = useObservable(db.cloud.userInteraction);
  const dbStatus = useObservable(db.cloud.syncState);

  const currentUser = useObservable(db.cloud.currentUser);

  const isUserAuthorized = currentUser?.userId !== 'unauthorized';

  const getUserLogged = useCallback(() => {
    try {
      if (!isUserAuthorized) login();
      return currentUser;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [currentUser, isUserAuthorized, login]);

  return {
    login,
    logout,
    getUserLogged,
    currentUser,
    isUserAuthorized,
    ui,
    dbStatus,
  };
};

export default useInitCloudDB;
