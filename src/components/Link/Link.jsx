import { Link as LinkReactRouterDom, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const Link = ({
  activeClassName,
  children,
  className,
  href,
  navLink,
}) => {
  const props = { activeClassName, children, className, to: href };

  return navLink ? <NavLink {...props} /> : <LinkReactRouterDom {...props} />;
};

Link.propTypes = {
  children: PropTypes.any.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  navLink: PropTypes.bool,
};
