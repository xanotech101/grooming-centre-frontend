import { Box, Flex } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { IoArrowBack } from "react-icons/io5";
import { AdminMainAreaWrapper } from "..";
import { Button, Heading, Text } from "../../components";
import { useGoBack } from "../../hooks";

export const CreatePageLayout = ({
  children,
  submitButtonText,
  subTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  submitButtonIsLoading,
  submitButtonIsDisabled,
  title,
  onSubmit,
}) => {
  const handleGoBack = useGoBack();

  return (
    <AdminMainAreaWrapper>
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
            <Heading as="h1" fontSize="heading.h2" marginBottom={4}>
              {title}
            </Heading>

            <Text as="level2">{subTitle}</Text>
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
          <Box as="form" flex={1} onSubmit={onSubmit}>
            {children}

            <Button
              type="submit"
              isLoading={submitButtonIsLoading}
              disabled={submitButtonIsDisabled || submitButtonIsLoading}
              loadingText={submitButtonText}
            >
              {submitButtonText}
            </Button>
          </Box>
        </Flex>
      </Box>
    </AdminMainAreaWrapper>
  );
};

CreatePageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  submitButtonIsLoading: PropTypes.bool,
  submitButtonIsDisabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
