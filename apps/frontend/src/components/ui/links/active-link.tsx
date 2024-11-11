import { LinkProps, useLocation } from "react-router-dom";
import cn from "classnames";
import AnchorLink from "@/components/ui/links/anchor-link";

interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  href: string;
}
const ActiveLink: React.FC<
  ActiveLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
> = ({ href, className, activeClassName = "active", ...props }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <AnchorLink
      className={cn(className, {
        [activeClassName]: pathname === href,
      })}
      {...props}
    />
  );
};

export default ActiveLink;
