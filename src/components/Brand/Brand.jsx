import { Box, Flex } from "@chakra-ui/layout";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import React from "react";
import { Heading } from "..";

export const Brand = () => {
  return (
    <Flex alignItems="center">
      <SkeletonCircle boxSize="50px" marginRight={2}></SkeletonCircle>

      <Box
        width="130px"
        borderLeft="1px"
        paddingLeft={2}
        alignSelf="flex-start"
      >
        <Heading medium lineHeight="30px">
          UNKNOWN
        </Heading>
      </Box>
    </Flex>
  );
};
