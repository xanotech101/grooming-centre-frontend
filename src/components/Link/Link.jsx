import { Link as LinkReactRouterDom, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const Link = ({
  activeClassName,
  children,
  className,
  href,
  navLink,
  exact,
}) => {
  const props = { children, className, to: href };

  return navLink ? (
    <NavLink exact={exact} activeClassName={activeClassName} {...props} />
  ) : (
    <LinkReactRouterDom {...props} />
  );
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  exact: PropTypes.bool,
  href: PropTypes.string.isRequired,
  navLink: PropTypes.bool,
};
