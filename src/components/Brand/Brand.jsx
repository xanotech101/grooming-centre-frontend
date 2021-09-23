import { Box, Flex } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { Heading, Image, Link, Text } from "..";

export const Brand = ({ sm, textColor }) => {
  return (
    <Link href="/">
      <Flex alignItems="center">
        <Logo sm={sm} />

        <Box
          width="130px"
          borderLeft={!sm && "2px"}
          paddingLeft={sm ? 1 : 4}
          marginLeft={sm ? 1 : 4}
          alignSelf="flex-start"
        >
          <Text
            fontSize={sm ? "text.level1" : "heading.h2"}
            lineHeight="30px"
            textColor={textColor}
            transform="translateY(20%)"
          >
            UNKNOWN
          </Text>
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
  return (
    <Image boxSize={sm ? "40px" : "50px"} isLoading rounded="full" {...rest} />
  );
};

BrandLogo.propTypes = {
  sm: PropTypes.bool,
};
Brand.propTypes = {
  sm: PropTypes.bool,
  textColor: PropTypes.string,
};
