import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "../../components";
import useGoBack from "./hooks/useGoBack";

export const CreatePageLayout = ({
  children,
  submitButtonText,
  subTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  title,
}) => {
  const handleGoBack = useGoBack();

  return (
    <Box as="section" paddingBottom={10}>
      <Flex
        shadow="md"
        rounded="sm"
        as="header"
        justifyContent="space-between"
        height="150px"
        backgroundColor="white"
        paddingX={5}
        paddingTop={5}
        marginBottom={5}
      >
        <Box>
          <Heading as="h1" size="lg" marginBottom={4}>
            {title}
          </Heading>

          <Text>{subTitle}</Text>
        </Box>

        <Button secondary leftIcon={<IoArrowBack />} onClick={handleGoBack}>
          Go Back
        </Button>
      </Flex>

      <Flex
        backgroundColor="white"
        paddingX={5}
        paddingTop={5}
        paddingBottom={16}
        shadow="md"
        rounded="sm"
      >
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
