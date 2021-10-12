import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "..";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";

export const Upload = forwardRef(
  (
    {
      error,
      id,
      isRequired,
      isMini,
      label,
      onFileSelect,
      width = "100%",
      ...rest
    },
    ref
  ) => {
    const onDrop = useCallback(
      (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          onFileSelect?.(file);
        });
      },
      [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    const renderContent = (props) => (
      <Flex
        flexDirection="column"
        justifyContent="center"
        width={width}
        padding={5}
        border="1px dashed"
        {...props}
        {...getRootProps()}
      >
        <Input ref={ref} {...getInputProps()} {...rest} />

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

          <Button width="fit-content" sm>
            Browse files
          </Button>
        </Stack>
      </Flex>
    );

    return (
      <FormGroup
        id={id}
        label={label}
        isRequired={isRequired}
        error={error}
        renderControl={(props) =>
          isMini ? (
            <MiniUploadContent
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              props={props}
              rest={{ ...rest }}
            />
          ) : (
            renderContent(props)
          )
        }
      />
    );
  }
);

const MiniUploadContent = forwardRef(
  ({ getRootProps, getInputProps, props, rest }, ref) => (
    <Flex alignItems="center">
      <Skeleton boxSize="60px" rounded="full" marginRight={5} />

      <Box {...props} {...getRootProps()}>
        <Input ref={ref} {...getInputProps()} {...rest} />

        <Button width="fit-content" secondary>
          Upload
        </Button>
      </Box>
    </Flex>
  )
);

Upload.propTypes = {
  ...FormGroupPropTypes,
  width: PropTypes.string,
  onDrop: PropTypes.func,
};
