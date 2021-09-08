import { Button as ButtonChakraui } from "@chakra-ui/button";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Button = ({ children, link, secondary, sm, ...rest }) => {
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
      : {};
  const getSMStyles = () =>
    sm
      ? {
          paddingX: "22px",
          size: "sm",
        }
      : {};

  const renderedContent = (
    <ButtonChakraui
      backgroundColor="primary.base"
      textColor="white"
      paddingX="33px"
      _hover={{
        backgroundColor: "primary.hover",
      }}
      {...getOutlineStyles()}
      {...getSMStyles()}
      {...rest}
    >
      {children}
    </ButtonChakraui>
  );

  return link ? <Link to={link}>{renderedContent}</Link> : renderedContent;
};

Button.propTypes = {
  children: PropTypes.any,
  secondary: PropTypes.bool,
  sm: PropTypes.bool,
  link: PropTypes.string,
};
