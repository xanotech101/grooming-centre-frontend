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
    case "h4":
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
  size,
  ...rest
}) => {
  return (
    <HeadingChakraui
      as={as}
      fontWeight={regular ? "light" : medium ? "regular" : "bold"}
      size={size}
      fontSize={!size ? getFontSize(as) : undefined}
      fontStyle={italic && "italic"}
      {...rest}
    >
      {children}
    </HeadingChakraui>
  );
};

Heading.propTypes = {
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  children: PropTypes.string.isRequired,
  italic: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  size: PropTypes.string,
};
