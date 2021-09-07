import { ChakraProvider } from "@chakra-ui/react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import theme from "../theme/theme";

function Providers({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </ChakraProvider>
  );
}
export default Providers;
