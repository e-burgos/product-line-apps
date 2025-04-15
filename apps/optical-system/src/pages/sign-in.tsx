import { useEffect } from 'react';
import AnchorLink from 'libs/ui/src/components/links/anchor-link';
import { appName } from '@optical-system-app/utils/const';
import { LoginButton, useAuthStore } from '@product-line/dexie';
import { Glasses } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function SignInPage() {
  const navigate = useNavigate();
  const { setLoading, isLoggedIn, lastRouteVisited } = useAuthStore();

  useEffect(() => {
    setLoading(false);
    if (isLoggedIn) navigate(lastRouteVisited);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid flex-grow grid-cols-0 gap-0 lg:grid-cols-[1fr_0%] 3xl:grid-cols-1">
      <div className="flex flex-col items-center justify-center py-14">
        <div className="grid w-full max-w-[408px] grid-cols-1 gap-4 px-4">
          <div className="mb-5 text-center lg:text-left">
            <Glasses
              size={45}
              className="h-52 w-52 mx-auto text-[#4B5563] dark:text-gray-300"
            />
            <h2 className="mb-2 text-center text-xl font-medium uppercase dark:text-white lg:text-2xl">
              {`Bienvenido a ${appName}`}
            </h2>
            <p className="text-sm text-center text-[#4B5563] dark:text-gray-300">
              Inicia sesión para continuar
            </p>
          </div>
          <LoginButton />
          <p className="flex items-center justify-center gap-3 text-sm text-[#4B5563] before:h-[1px] before:w-full before:border-t before:border-dashed after:h-[1px] after:w-full after:border-t after:border-dashed dark:text-gray-300 dark:before:border-gray-500 dark:after:border-gray-500 ">
            o
          </p>
          <p className="text-sm tracking-[0.5px] text-center text-[#4B5563] dark:text-gray-300">
            <AnchorLink
              to={'https://www.estebanburgos.com.ar/'}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-black/80 dark:text-gray-300"
            >
              Contactar soporte
            </AnchorLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
