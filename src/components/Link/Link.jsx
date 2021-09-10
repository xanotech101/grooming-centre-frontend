import { Link as LinkReactRouterDom } from "react-router-dom";
import PropTypes from "prop-types";

export const Link = ({ children, href }) => {
  return <LinkReactRouterDom to={href}>{children}</LinkReactRouterDom>;
};

Link.propTypes = {
  children: PropTypes.any.isRequired,
  href: PropTypes.string.isRequired,
};
