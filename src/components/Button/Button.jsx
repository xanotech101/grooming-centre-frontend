import { Button as Button_chakraui } from "@chakra-ui/button";
import React from "react";
import PropTypes from "prop-types";

export const Button = ({ children, outline, ...rest }) => {
  const getOutlineStyles = () =>
    outline
      ? {
          backgroundColor: "transparent",
          textColor: "#800020",
          border: "1px",
        }
      : {};

  return (
    <Button_chakraui
      backgroundColor="#800020"
      textColor="white"
      paddingX={7}
      _hover={{ opacity: 0.7 }}
      {...getOutlineStyles()}
      {...rest}
    >
      {children}
    </Button_chakraui>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  outline: PropTypes.bool,
};
