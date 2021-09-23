import { Link as LinkReactRouterDom, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const Link = ({
  activeClassName,
  activeStyle,
  children,
  className,
  exact,
  href,
  navLink,
  style,
  onClick,
}) => {
  const props = { children, className, to: href, style, onClick };

  return navLink ? (
    <NavLink
      activeStyle={activeStyle}
      exact={exact}
      activeClassName={activeClassName}
      {...props}
    />
  ) : (
    <LinkReactRouterDom {...props} />
  );
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  activeStyle: PropTypes.object,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  exact: PropTypes.bool,
  href: PropTypes.string.isRequired,
  navLink: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
