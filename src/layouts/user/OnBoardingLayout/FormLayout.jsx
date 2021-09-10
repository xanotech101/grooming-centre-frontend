import { Box, Flex, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const OnBoardingFormLayout = ({
  renderBody,
  renderFooter,
  renderHeader,
  renderInputs,
  renderSubmit,
}) => {
  return (
    <Box as="section">
      {renderHeader && (
        <Box as="header" textAlign="center" height="120px">
          {renderHeader()}
        </Box>
      )}

      <Box marginBottom={5}>
        {renderBody?.()}

        {renderInputs && renderSubmit && (
          <Flex flexDirection="column" as="form" width="356px">
            {
              <Stack spacing={5} marginBottom={10}>
                {renderInputs()}
              </Stack>
            }

            {renderSubmit({ type: "submit" })}
          </Flex>
        )}
      </Box>
      {renderFooter && (
        <Box as="footer" fontWeight="bold">
          {renderFooter()}
        </Box>
      )}
    </Box>
  );
};

OnBoardingFormLayout.propTypes = {
  renderBody: PropTypes.func,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  renderInputs: PropTypes.func,
  renderSubmit: PropTypes.func,
};
