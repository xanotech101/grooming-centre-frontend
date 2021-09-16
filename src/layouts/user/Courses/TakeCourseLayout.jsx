import { Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/layout";
import breakpoints from "../../../theme/breakpoints";

const TakeCourseLayout = () => {
  return (
    <Flex maxWidth={breakpoints["4k"]} marginX="auto">
      <div>SideBar</div>
      <div>MainArea</div>
    </Flex>
  );
};

export const TakeCourseLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <TakeCourseLayout {...props} />} />
  );
};
