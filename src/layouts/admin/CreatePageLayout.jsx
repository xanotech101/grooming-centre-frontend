import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { Button } from "../../components";

export const CreatePageLayout = ({
  children,
  submitButtonText,
  subTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  title,
}) => {
  return (
    <Box as="section" paddingX={10} paddingTop={5} paddingBottom={10}>
      <Flex
        shadow="md"
        as="header"
        flexDirection="column"
        justifyContent="center"
        height="150px"
        backgroundColor="white"
        paddingX={5}
        marginBottom={5}
      >
        <Heading as="h1" size="lg" marginBottom={4}>
          {title}
        </Heading>

        <Text>{subTitle}</Text>
      </Flex>

      <Flex backgroundColor="white" padding={10} paddingBottom={16} shadow="md">
        <Box as="form" flex={1}>
          {children}

          <Button>{submitButtonText}</Button>
        </Box>
      </Flex>
    </Box>
  );
};

CreatePageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
