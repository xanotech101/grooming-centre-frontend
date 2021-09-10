import { Box, Flex } from "@chakra-ui/layout";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import PropTypes from "prop-types";

import { Heading, Link } from "..";

export const Brand = () => {
  return (
    <Link href="/">
      <Flex alignItems="center">
        <Logo />

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
    </Link>
  );
};

export const BrandLogo = ({ sm, ...rest }) => {
  return (
    <Link href="/">
      <Logo sm={sm} {...rest} />
    </Link>
  );
};

const Logo = ({ sm, ...rest }) => {
  return <SkeletonCircle boxSize={sm ? "40px" : "50px"} {...rest} />;
};

BrandLogo.propTypes = {
  sm: PropTypes.bool,
};
