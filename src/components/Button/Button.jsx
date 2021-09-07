import { Button as Button_chakraui } from "@chakra-ui/button";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Button = ({ children, link, outline, ...rest }) => {
  const getOutlineStyles = () =>
    outline
      ? {
          backgroundColor: "transparent",
          textColor: "primary.base",
          border: "1px",
        }
      : {};

  const renderedContent = (
    <Button_chakraui
      backgroundColor="primary.base"
      textColor="white"
      paddingX="33px"
      _hover={{
        backgroundColor: "primary.hover",
      }}
      {...getOutlineStyles()}
      {...rest}
    >
      {children}
    </Button_chakraui>
  );

  return link ? <Link to={link}>{renderedContent}</Link> : renderedContent;
};

Button.propTypes = {
  children: PropTypes.any,
  outline: PropTypes.bool,
  link: PropTypes.string,
};
