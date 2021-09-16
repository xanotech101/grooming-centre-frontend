import { Button as ButtonChakraui, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";

import PropTypes from "prop-types";
import { Link } from "..";

export const Button = ({
  asIcon,
  children,
  disabled,
  ghost,
  iconAriaLabel,
  leftIcon,
  link,
  secondary,

  sm,
  ...rest
}) => {
  const getOutlineStyles = () => {
    const commonStyles = {
      backgroundColor: "transparent",
      textColor: "primary.base",
      border: "1px",
      paddingX: "33px",
      rounded: "4px",
      _hover: !disabled && {
        backgroundColor: "primary.hover",
      },
    };

    return secondary
      ? {
          ...commonStyles,
          _hover: !disabled && {
            backgroundColor: "secondary.1",
          },
        }
      : ghost
      ? {
          ...commonStyles,
          borderColor: "transparent",
          rounded: "none",
          _hover: !disabled && {
            backgroundColor: "secondary.05",
          },
        }
      : {
          ...commonStyles,
          backgroundColor: "primary.base",
          textColor: "white",
          borderColor: "transparent",
        };
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
      : getOutlineStyles();

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
      <ButtonChakraui
        position="relative"
        {...getButtonSmallStyles()}
        {...props}
      >
        {leftIcon && (
          <Icon
            position="absolute"
            top="50%"
            left="10px"
            transform="translateY(-35%)"
            fontSize="text.level2"
          >
            {leftIcon}
          </Icon>
        )}
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
  ghost: PropTypes.bool,
  iconAriaLabel: PropTypes.string,
  link: PropTypes.string,
  leftIcon: PropTypes.element,
  secondary: PropTypes.bool,
  sm: PropTypes.bool,
};
