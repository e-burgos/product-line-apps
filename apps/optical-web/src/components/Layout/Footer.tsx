import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const navigation = {
    shop: [
      { name: 'Anteojos de Sol', href: '/productos/sun' },
      { name: 'Anteojos de Receta', href: '/productos/prescription' },
      { name: 'Deportivos', href: '/productos/sports' },
      { name: 'Niños', href: '/productos/kids' },
    ],
    company: [
      { name: 'Sobre Nosotros', href: '#' },
      { name: 'Tiendas', href: '#' },
      { name: 'Trabaja con Nosotros', href: '#' },
    ],
    legal: [
      { name: 'Términos y Condiciones', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Política de Cookies', href: '#' },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => <Facebook {...props} />,
      },
      {
        name: 'Instagram',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <Instagram {...props} />
        ),
      },
      {
        name: 'Twitter',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => <Twitter {...props} />,
      },
    ],
  };

  return (
    <footer
      className="bg-gray-100 dark:bg-gray-800"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-custom mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="text-2xl font-bold">
              OpticalName
            </Link>
            <p className="text-gray-500 text-base">
              Especialistas en anteojos de sol y receta con más de 20 años de
              experiencia.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-current dark:text-white tracking-wider uppercase">
                  Tienda
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-current dark:text-white tracking-wider uppercase">
                  Empresa
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-current dark:text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} OpticaWeb. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
