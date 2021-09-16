import { Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/layout";
import breakpoints from "../../../../theme/breakpoints";
import Sidebar from "./Sidebar";

const TakeCourseLayout = () => {
  return (
    <Flex maxWidth={breakpoints["4k"]} marginX="auto">
      <Sidebar />
      <div>MainArea</div>
    </Flex>
  );
};

export const TakeCourseLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <TakeCourseLayout {...props} />} />
  );
};
