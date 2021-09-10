import { Text as TextChakraui } from "@chakra-ui/layout";

import PropTypes from "prop-types";

const getFontSize = (type) => {
  let fontSize = "";

  switch (type) {
    case "level1":
      fontSize = "20px";
      break;
    case "level2":
      fontSize = "18px";
      break;
    case "level3":
      fontSize = "16px";
      break;
    case "level4":
      fontSize = "14px";
      break;
    case "level5":
      fontSize = "12px";
      break;
    case "level6":
      fontSize = "8px";
      break;
    case "level7":
      fontSize = "6px";
      break;
  }

  return fontSize;
};

export const Text = ({ as = "level4", bold, children, italic, ...rest }) => {
  return (
    <TextChakraui
      fontWeight={bold ? "bold" : "regular"}
      fontSize={getFontSize(as)}
      fontStyle={italic && "italic"}
      {...rest}
    >
      {children}
    </TextChakraui>
  );
};

Text.propTypes = {
  as: PropTypes.oneOf(["level1", "level2", "level3", "level4", "level5"]),
  bold: PropTypes.bool,
  children: PropTypes.string.isRequired,
  italic: PropTypes.bool,
};
