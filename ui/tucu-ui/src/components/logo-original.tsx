import Image from './image';
import AnchorLink from './links/anchor-link';
import { useIsMounted } from '../hooks/use-is-mounted';
import lightLogo from '../assets/images/logo.svg';
import darkLogo from '../assets/images/logo-white.svg';
import cn from 'classnames';
import { useTheme } from '../themes/use-theme';

interface LogoPropTypes {
  className?: string;
  path?: string;
}

export default function Logo({ className, path }: LogoPropTypes) {
  const { mode } = useTheme();
  const isMounted = useIsMounted();
  const isDarkMode = mode === 'dark';
  return (
    isMounted && (
      <AnchorLink
        to={path || '/'}
        className={cn('flex w-28 outline-none sm:w-32 4xl:w-36', className)}
      >
        <span className="relative flex overflow-hidden">
          {isDarkMode && (
            <Image src={darkLogo} alt="agroSwap" height={24} priority />
          )}
          {!isDarkMode && (
            <Image src={lightLogo} alt="agroSwap" height={24} priority />
          )}
        </span>
      </AnchorLink>
    )
  );
}
