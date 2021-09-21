import { ChakraProvider } from "@chakra-ui/react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AppProvider } from "../contexts/App/AppProvider";
import theme from "../theme/theme";

function GlobalProviders({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppProvider>{children}</AppProvider>
      </MuiPickersUtilsProvider>
    </ChakraProvider>
  );
}

export default GlobalProviders;
