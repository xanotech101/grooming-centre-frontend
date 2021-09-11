import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import fontSizes from "./fontSizes";
import fonts from "./fonts";

const theme = extendTheme({
  colors,
  fontSizes,
  fonts,
});

export default theme;
