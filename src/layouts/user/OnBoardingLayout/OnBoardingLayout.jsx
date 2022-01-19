import { Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import Hero from "./Hero";
import MainArea from "./MainArea";

const OnBoardingLayout = () => {
  return (
    <Flex height="100vh" w="100vw" pos="fixed" top={0} left={0}>
      <MainArea />
      <Hero />
    </Flex>
  );
};

export const OnBoardingLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <OnBoardingLayout {...props} />} />
  );
};
