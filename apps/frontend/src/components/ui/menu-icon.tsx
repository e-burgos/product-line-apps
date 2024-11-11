import Image from "@/components/ui/image";
import { useIsMounted } from "@/hooks/use-is-mounted";
import lightLogo from "@/assets/images/menu.svg";
import darkLogo from "@/assets/images/menu-dark.svg";
import { useTheme } from "@/themes/use-theme";

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={darkLogo} alt="agroSwap" priority />
        )}
        {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="agroSwap" priority />
        )}
      </span>
    </div>
  );
};

export default Logo;
