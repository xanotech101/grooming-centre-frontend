import { Box, Grid } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Heading } from "../../../components";
import breakpoints, {
  maxWidthStyles_userPages,
} from "../../../theme/breakpoints";

const ChatLayout = () => {
  return (
    <Grid
      {...maxWidthStyles_userPages}
      maxWidth={breakpoints["tablet"]}
      gridTemplateColumns="200px 1fr"
      gridGap={10}
      padding={8}
    >
      <Box as="aside">
        <Box background="accent.1" padding={3} roundedTop="md">
          <Heading fontSize="text.level3">Messaging</Heading>
        </Box>
      </Box>

      <Box as="main">
        <Box background="accent.1" padding={5} roundedTop="md">
          <Heading fontSize="text.level3">Messaging</Heading>
        </Box>
      </Box>
    </Grid>
  );
};

export const ChatLayoutRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ChatLayout {...props} />} />;
};
