import { Text as TextChakraui } from "@chakra-ui/layout";
import PropTypes from "prop-types";

export const Text = ({ as = "level4", bold, children, italic, ...rest }) => {
  return (
    <TextChakraui
      fontWeight={bold ? "bold" : "regular"}
      fontSize={`text.${as}`}
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
  children: PropTypes.any.isRequired,
  italic: PropTypes.bool,
};
