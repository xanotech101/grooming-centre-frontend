import { Button as ButtonChakraui, IconButton } from "@chakra-ui/button";

import PropTypes from "prop-types";
import { Link } from "..";

export const Button = ({
  asIcon,
  children,
  iconAriaLabel,
  link,
  secondary,
  sm,
  ...rest
}) => {
  const getOutlineStyles = () =>
    secondary
      ? {
          backgroundColor: "transparent",
          textColor: "primary.base",
          border: "1px",
          _hover: {
            backgroundColor: "secondary.1",
          },
        }
      : {
          backgroundColor: "primary.base",
          textColor: "white",
          paddingX: "33px",
          rounded: "4px",
          _hover: {
            backgroundColor: "primary.hover",
          },
        };
  const getButtonSmallStyles = () =>
    sm
      ? {
          paddingX: "22px",
          size: "sm",
        }
      : {};

  const renderContent = (extraProps) => {
    const styles = asIcon
      ? {
          fontSize: "25px",
          isRound: true,
          _hover: {
            backgroundColor: "primary.hover",
            textColor: "white",
          },
        }
      : getOutlineStyles();

    const props = {
      ...styles,
      ...extraProps,
      ...rest,
    };

    return asIcon ? (
      <IconButton aria-label={iconAriaLabel} {...props}>
        {children}
      </IconButton>
    ) : (
      <ButtonChakraui {...getButtonSmallStyles()} {...props}>
        {children}
      </ButtonChakraui>
    );
  };

  return link ? (
    <Link href={link}>{renderContent({ tabIndex: -1 })}</Link>
  ) : (
    renderContent()
  );
};

Button.propTypes = {
  asIcon: PropTypes.bool,
  children: PropTypes.any,
  iconAriaLabel: PropTypes.string,
  link: PropTypes.string,
  secondary: PropTypes.bool,
  sm: PropTypes.bool,
};
