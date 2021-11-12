import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, Image } from "../..";
import FormGroup, { FormGroupPropTypes } from "../FormGroup";
import MiniUploadContent from "./MiniUploadContent";

export const Upload = forwardRef(
  (
    {
      error,
      id,
      isRequired,
      isMini,
      imageUrl,
      videoUrl,
      pdfUrl,
      alt,
      label,
      onFileSelect,
      width = "100%",
      accept,
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
      accept,
    });

    const hasUploaded = imageUrl || videoUrl || pdfUrl;

    const renderContent = (props) => {
      const style = !hasUploaded
        ? {
            flexDirection: "column",
            justifyContent: "center",
            width,
            padding: 5,
            border: "1px dashed",
          }
        : {};

      return (
        <Flex {...style} {...props} {...getRootProps()}>
          <Input ref={ref} {...getInputProps()} {...rest} />

          {hasUploaded ? (
            <>
              {videoUrl ? (
                <video src={videoUrl} controls width="300px" height="150px" />
              ) : pdfUrl ? (
                <object
                  width="100%"
                  height="400"
                  data={pdfUrl}
                  type="application/pdf"
                >
                  {" "}
                </object>
              ) : (
                <Image
                  src={imageUrl}
                  width={isMini ? "80px" : "300px"}
                  borderRadius={isMini ? "50%" : null}
                  height={isMini ? "80px" : "150px"}
                  alt={alt}
                />
              )}
              <MiniUploadContent
                mute
                hideImage
                wrapperProps={
                  isMini
                    ? { alignItems: "center", paddingLeft: "16px" }
                    : { alignItems: "flex-end", paddingLeft: "16px" }
                }
                props={props}
              />
            </>
          ) : isMini ? (
            <Flex alignItems="center">
              <Skeleton boxSize="60px" rounded="full" marginRight={5} />
              <Button width="fit-content" secondary sm>
                Re-upload
              </Button>
            </Flex>
          ) : (
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
          )}
        </Flex>
      );
    };

    return (
      <FormGroup
        id={id}
        label={label}
        isRequired={isRequired}
        error={error}
        renderControl={(props) => renderContent(props)}
      />
    );
  }
);

Upload.propTypes = {
  ...FormGroupPropTypes,
  width: PropTypes.string,
  onDrop: PropTypes.func,
};
