import React from 'react';
import Button from 'libs/ui/src/components/button/button';
import { useNavigate } from 'react-router-dom';
import { NotebookIcon, SearchX } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent text-current dark:text-white min-h-[calc(100vh-60px)] flex flex-col items-center justify-center text-center">
      <div className="mx-auto px-4 py-16 sm:py-24">
        <div className="flex justify-center">
          <SearchX className="h-28 w-28" />
        </div>
        <h1 className="mt-5 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Página no encontrada
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-10">
          <Button shape="rounded" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};
