import Image from '../utils/image';
import { useIsMounted } from '../../hooks/use-is-mounted';
import lightLogo from '../../assets/images/logo-icon.svg';
import darkLogo from '../../assets/images/logo-icon-white.png';
import { useTheme } from '../../themes/use-theme';

export const LogoIcon: React.FC<React.SVGAttributes<object>> = (props) => {
  const isMounted = useIsMounted();
  const { mode, logo, preset } = useTheme();
  const isDarkMode = mode === 'dark';

  const LogoType = () => {
    if (logo?.isoType) return logo.isoType;

    if (!logo?.isoType && logo?.name)
      return (
        <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
          <span className="text-2xl font-semibold xl:text-3xl">
            {logo.name.charAt(0)}
          </span>
          {logo?.secondName && (
            <span
              className={`text-2xl font-semibold xl:text-3xl text-${preset?.label?.toLowerCase()}-500`}
            >
              {logo.secondName.charAt(0)}
            </span>
          )}
        </div>
      );

    return (
      <Image
        src={isDarkMode ? darkLogo : lightLogo}
        alt="logo"
        priority
        width={28}
      />
    );
  };

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && <LogoType />}
      </span>
    </div>
  );
};

export default LogoIcon;
