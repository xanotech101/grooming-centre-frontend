import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";

function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
export default Providers;
