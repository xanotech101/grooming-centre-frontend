import { Flex } from "@chakra-ui/layout";
import { Spinner } from "../../../components";

export const PageLoaderLayout = ({ children = <Spinner /> }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
      placeItems="center"
    >
      {children}
    </Flex>
  );
};
