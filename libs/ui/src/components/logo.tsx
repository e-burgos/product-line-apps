import AnchorLink from './links/anchor-link';
import { useIsMounted } from '../hooks/use-is-mounted';
import cn from 'classnames';
import { useTheme } from '../themes/use-theme';

interface LogoPropTypes {
  className?: string;
}

export default function Logo({ className }: LogoPropTypes) {
  const { mode, preset, logo } = useTheme();
  const { name, secondName, path } = logo;
  const isMounted = useIsMounted();
  const isDarkMode = mode === 'dark';
  return (
    isMounted && (
      <AnchorLink
        to={path || '/'}
        className={cn('flex outline-none', className)}
      >
        <span className="relative flex overflow-hidden">
          {isDarkMode && (
            <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
              <span className="text-2xl font-semibold xl:text-3xl">
                {name || 'Site Name'}
              </span>
              {secondName && (
                <span
                  className={`text-2xl font-semibold xl:text-3xl text-${preset?.label?.toLowerCase()}-500`}
                >
                  {secondName}
                </span>
              )}
            </div>
          )}
          {!isDarkMode && (
            <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
              <span className="text-2xl font-semibold xl:text-3xl">
                {name || 'Site Name'}
              </span>
              {secondName && (
                <span
                  className={`text-2xl font-semibold xl:text-3xl text-${preset?.label?.toLowerCase()}-500`}
                >
                  {secondName}
                </span>
              )}
            </div>
          )}
        </span>
      </AnchorLink>
    )
  );
}
