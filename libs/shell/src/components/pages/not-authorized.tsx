import Image from 'libs/ui/src/components/image';
import AnchorLink from 'libs/ui/src/components/links/anchor-link';
import Button from 'libs/ui/src/components/button';
import { useIsMounted } from 'libs/ui/src/hooks/use-is-mounted';
import ErrorLightImage from 'libs/ui/src/assets/images/404-light.svg';
import ErrorDarkImage from 'libs/ui/src/assets/images/404-dark.svg';
import { useTheme } from 'libs/ui/src/themes/use-theme';
import { commonRoutePaths } from '../../router/routes';
import { useInitCloudDB } from 'libs/dexie/src/optical-cloud-db';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotAuthorizedPage = () => {
  const { isUserDeactivated } = useInitCloudDB();
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  useEffect(() => {
    if (!isUserDeactivated) navigate(commonRoutePaths.home);
  }, [isUserDeactivated, isMounted, navigate]);

  return (
    <div className="flex max-w-full flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
      <div className="relative w-52 max-w-full sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
        {isMounted && !isDarkMode && (
          <Image src={ErrorLightImage} alt="404 Error" />
        )}
        {isMounted && isDarkMode && (
          <Image src={ErrorDarkImage} alt="404 Error" />
        )}
      </div>

      <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
        Usuario no autorizado
      </h2>
      <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
        Lo sentimos, no tienes permiso para acceder a nuestro sistema. Por
        favor, contacta al administrador del sistema si crees que esto es un
        error.
      </p>

      <AnchorLink
        to={'https://www.estebanburgos.com.ar/'}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline hover:text-black/80 dark:text-gray-300"
      >
        <Button shape="rounded">Contactar Soporte</Button>
      </AnchorLink>
    </div>
  );
};

export default NotAuthorizedPage;
