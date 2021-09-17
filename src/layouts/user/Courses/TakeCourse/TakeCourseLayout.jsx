import { Route } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import breakpoints from "../../../../theme/breakpoints";
import Sidebar from "./Sidebar";
import MainArea from "./MainArea";
import { TakeCourseProvider } from "../../../../contexts";

const TakeCourseLayout = () => {
  return (
    <Flex maxWidth={breakpoints["4k"]} marginX="auto" height="100vh">
      <TakeCourseProvider>
        <Sidebar />
        <MainArea />
      </TakeCourseProvider>
    </Flex>
  );
};

export const TakeCourseLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <TakeCourseLayout {...props} />} />
  );
};
