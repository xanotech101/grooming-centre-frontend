import { FormControl, FormLabel } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { BsDot } from "react-icons/bs";
import { Spinner, Text } from "..";

const FormGroup = ({
  id,
  isRequired,
  isLoading,
  label,
  renderControl,
  error,
}) => {
  return (
    <FormControl
      id={id}
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {label && (
        <FormLabel fontSize="text.level2" display="flex">
          {label}
          {isRequired && (
            <Icon color="red.300" fontSize="heading.h3">
              <BsDot />
            </Icon>
          )}
        </FormLabel>
      )}
      <Flex alignItems="center">
        {renderControl({
          rounded: "4px",
          borderColor: "accent.2",
          disabled: isLoading,
        })}

        {isLoading && <Spinner size="md" position="absolute" right={2} />}
      </Flex>

      {error && (
        <Text
          position="absolute"
          bottom={-5}
          color="secondary.5"
          style={{ marginTop: 0 }}
        >
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export const FormGroupPropTypes = {
  renderControl: PropTypes.func,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

FormGroup.propTypes = FormGroupPropTypes;

export default FormGroup;
