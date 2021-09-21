import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Flex } from "@chakra-ui/layout";

import PropTypes from "prop-types";
import { Spinner } from "..";

const FormGroup = ({ id, isRequired, isLoading, label, renderControl }) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {label && <FormLabel fontSize="text.level2">{label}</FormLabel>}
      <Flex alignItems="center">
        {renderControl({
          rounded: "4px",
          borderColor: "accent.2",
          disabled: isLoading,
        })}

        {isLoading && <Spinner size="md" position="absolute" right={2} />}
      </Flex>
    </FormControl>
  );
};

export const FormGroupPropTypes = {
  renderControl: PropTypes.func,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.propTypes = FormGroupPropTypes;

export default FormGroup;
