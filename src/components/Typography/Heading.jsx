import { Heading as HeadingChakraui } from "@chakra-ui/layout";
import React from "react";
import PropTypes from "prop-types";

const getFontSize = (type) => {
  let fontSize = "";

  switch (type) {
    case "h1":
      fontSize = "42px";
      break;
    case "h2":
      fontSize = "36px";
      break;
    case "h3":
      fontSize = "24px";
      break;
    case "h3":
      fontSize = "20px";
      break;
  }

  return fontSize;
};

export const Heading = ({
  as = "h2",
  children,
  italic,
  medium,
  regular,
  ...rest
}) => {
  return (
    <HeadingChakraui
      as={as}
      fontFamily="'Lato', sans-serif"
      fontWeight={regular ? "light" : medium ? "regular" : "bold"}
      fontSize={getFontSize(as)}
      fontStyle={italic && "italic"}
      {...rest}
    >
      {children}
    </HeadingChakraui>
  );
};

Heading.propTypes = {
  as: PropTypes.string,
  children: PropTypes.element.isRequired,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
};
