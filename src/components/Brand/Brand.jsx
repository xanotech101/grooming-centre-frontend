import { Box, Flex } from "@chakra-ui/layout";
import { SkeletonCircle } from "@chakra-ui/skeleton";

import { Heading } from "..";

export const Brand = () => {
  return (
    <Flex alignItems="center">
      <SkeletonCircle boxSize="50px"></SkeletonCircle>

      <Box
        width="130px"
        borderLeft="2px"
        paddingLeft={4}
        marginLeft={4}
        alignSelf="flex-start"
      >
        <Heading medium lineHeight="30px">
          UNKNOWN
        </Heading>
      </Box>
    </Flex>
  );
};
