import { Box, Flex } from "@chakra-ui/layout";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import PropTypes from "prop-types";

import { Heading } from "..";

export const Brand = () => {
  return (
    <Flex alignItems="center">
      <BrandLogo />

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

export const BrandLogo = ({ sm }) => {
  return <SkeletonCircle boxSize={sm ? "40px" : "50px"} />;
};

BrandLogo.propTypes = {
  sm: PropTypes.bool,
};
