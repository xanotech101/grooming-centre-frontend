import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "..";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";

export const Upload = ({
  id,
  isRequired,
  label,
  value,
  onChange = () => {},
  width = "100%",
  ...rest
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FormGroup
      id={id}
      label={label}
      isRequired={isRequired}
      renderControl={(props) => (
        <Flex
          flexDirection="column"
          justifyContent="center"
          width={width}
          padding={5}
          border="1px dashed"
          {...props}
          {...getRootProps()}
        >
          <Input {...rest} {...getInputProps()} />

          <Stack alignItems="center" textAlign="center" spacing={2}>
            <Box>
              <Icon color="primary.base" fontSize="25px" width="30px">
                <FaCloudUploadAlt />
              </Icon>

              {isDragActive ? (
                <Text>Drop The File Here ...</Text>
              ) : (
                <Text>Drag & Drop Your Files Here</Text>
              )}
            </Box>

            <Text color="accent.2">Or</Text>

            <Button width="fit-content">Browse files</Button>
          </Stack>
        </Flex>
      )}
    />
  );
};

Upload.propTypes = {
  ...FormGroupPropTypes,
  onChange: PropTypes.func,
  height: PropTypes.string,
  width: PropTypes.string,
};
