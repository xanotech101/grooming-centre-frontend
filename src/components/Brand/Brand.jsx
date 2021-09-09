import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";

export const Brand = () => {
  return (
    <Flex>
      <Skeleton boxSize="50px" marginRight={2}></Skeleton>

      <Box
        width="100px"
        borderLeft="1px"
        paddingLeft={2}
        alignSelf="flex-start"
      >
        <Heading size="lg" lineHeight="25px">
          UNKNOWN
        </Heading>
      </Box>
    </Flex>
  );
};
