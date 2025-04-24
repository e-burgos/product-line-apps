import { Link, LinkProps } from "react-router-dom";

const AnchorLink: React.FC<
  LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
> = ({ ...props }) => {
  return <Link {...props} />;
};

export default AnchorLink;
