import AnchorLink from "@/components/ui/links/anchor-link";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { routePaths } from "@/app/router/routes";
import cn from "classnames";
import { useTheme } from "@/themes/use-theme";

interface LogoPropTypes {
  className?: string;
}

export default function Logo({ className }: LogoPropTypes) {
  const { mode } = useTheme();
  const isMounted = useIsMounted();
  const isDarkMode = mode === "dark";
  return (
    isMounted && (
      <AnchorLink
        to={routePaths.home}
        className={cn("flex outline-none", className)}
      >
        <span className="relative flex overflow-hidden">
          {isDarkMode && (
            <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
              <span className="text-2xl font-semibold xl:text-3xl">AGRO</span>
              <span className="text-2xl font-semibold xl:text-3xl text-green-500">
                SWAP
              </span>
            </div>
          )}
          {!isDarkMode && (
            <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
              <span className="text-2xl font-semibold xl:text-3xl">AGRO</span>
              <span className="text-2xl font-semibold xl:text-3xl text-green-500">
                SWAP
              </span>
            </div>
          )}
        </span>
      </AnchorLink>
    )
  );
}
