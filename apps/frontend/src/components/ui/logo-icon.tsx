import Image from "@/components/ui/image";
import { useIsMounted } from "@/hooks/use-is-mounted";
import lightLogo from "@/assets/images/logo-icon.svg";
import darkLogo from "@/assets/images/logo-icon-white.png";
import { useTheme } from "@/themes/use-theme";

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={darkLogo} alt="AgroSwap" priority width={28} />
        )}
        {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="AgroSwap" priority width={28} />
        )}
      </span>
    </div>
  );
};

export default Logo;
