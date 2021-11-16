import { Flex } from "@chakra-ui/layout";
import { Spinner } from "../../../components";

export const PageLoaderLayout = ({ children = <Spinner />, ...rest }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
      {...rest}
    >
      {children}
    </Flex>
  );
};
