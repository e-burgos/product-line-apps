import { useObservable } from 'dexie-react-hooks';
import { db } from '../../db';
import { useToastStore } from 'libs/ui/src/hooks';
import { useCallback } from 'react';
import { useAuthStore } from './use-auth-store';
import { adminEmail } from '../../const';
import { SyncState } from 'dexie-cloud-addon';

export interface IDbStatus extends SyncState {
  license: 'deactivated' | 'ok' | 'expired';
}

export const useInitCloudDB = () => {
  const { addToast } = useToastStore();
  const { isLoggedIn, loading, setLoading, setIsLoggedIn, setOpenLoginModal } =
    useAuthStore();

  const login = useCallback(async () => {
    setLoading(true);
    try {
      await db.cloud.login();
      await db.cloud.sync({ purpose: 'pull', wait: false });
      setIsLoggedIn(true);
      setLoading(false);
      addToast({
        id: 'authenticated',
        title: 'Autenticado',
        message: 'Usuario autenticado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error('login:', error);
      setIsLoggedIn(false);
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  }, [addToast, setIsLoggedIn, setLoading, setOpenLoginModal]);

  const logout = useCallback(async () => {
    setIsLoggedIn(true);
    setLoading(true);
    try {
      await db.cloud.logout();
      await db.cloud.sync({ purpose: 'pull', wait: false });
      console.log('Sessión cerrada.');
      setLoading(false);
      setIsLoggedIn(false);
      addToast({
        id: 'logged-out',
        title: 'Sesión cerrada',
        message: 'Se ha cerrado la sesión.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      setIsLoggedIn(true);
      setLoading(false);
      addToast({
        id: 'logout-error',
        title: 'Error',
        message: 'No se pudo cerrar la sesión.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    } finally {
      setLoading(false);
    }
  }, [addToast, setIsLoggedIn, setLoading]);

  const syncDb = useCallback(async () => {
    try {
      await db.cloud.sync({ purpose: 'pull', wait: false });
      console.info('Sync realizado correctamente.');
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'sync-error',
        title: 'Error',
        message: 'No se pudo sincronizar la base de datos.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  }, [addToast]);

  const ui = useObservable(db.cloud.userInteraction);

  const dbStatus = useObservable(db.cloud.syncState) as IDbStatus;

  const currentUser = useObservable(db.cloud.currentUser) || null;

  const handleUserAuthorized = useCallback(() => {
    if (!currentUser?.email) return null;
    if (currentUser?.email && currentUser?.userId !== 'unauthorized')
      return true;
    if (currentUser?.email && currentUser?.userId === 'unauthorized')
      return false;
    return null;
  }, [currentUser]);

  const isUserAuthorized = handleUserAuthorized();

  const isUserDeactivated = dbStatus?.license === 'deactivated' || null;

  const isAdmin = currentUser?.email === adminEmail;

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
    syncDb,
    ui,
    dbStatus,
    isAdmin,
    currentUser,
    isUserAuthorized,
    isUserDeactivated,
    isLoggedIn,
    loading,
  };
};

export default useInitCloudDB;
