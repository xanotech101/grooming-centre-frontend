import { Button as ButtonChakraui, IconButton } from "@chakra-ui/button";

import PropTypes from "prop-types";
import { Link } from "..";

export const Button = ({
  asIcon,
  children,
  disabled,
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
          paddingX: "33px",
          _hover: !disabled && {
            backgroundColor: "secondary.1",
          },
        }
      : {
          backgroundColor: "primary.base",
          textColor: "white",
          paddingX: "33px",
          _hover: !disabled && {
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
          fontSize: "text.level1",
          isRound: true,
          _hover: !disabled && {
            backgroundColor: "primary.hover",
            textColor: "white",
          },
        }
      : {
          ...getOutlineStyles(),
          rounded: "4px",
        };

    const props = {
      disabled,
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

  return link && !disabled ? (
    <Link href={link}>{renderContent({ tabIndex: -1 })}</Link>
  ) : (
    renderContent()
  );
};

Button.propTypes = {
  asIcon: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  iconAriaLabel: PropTypes.string,
  link: PropTypes.string,
  secondary: PropTypes.bool,
  sm: PropTypes.bool,
};
