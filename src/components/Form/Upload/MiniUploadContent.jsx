import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { forwardRef } from "react";
import { Button } from "../..";

const MiniUploadContent = forwardRef(
  (
    { getRootProps, getInputProps, hideImage, wrapperProps, props, rest },
    ref
  ) => (
    <Flex alignItems="center" {...wrapperProps}>
      {!hideImage && <Skeleton boxSize="60px" rounded="full" marginRight={5} />}

      <Box {...props} {...getRootProps()}>
        <Input ref={ref} {...getInputProps()} {...rest} />

        <Button width="fit-content" secondary>
          Upload
        </Button>
      </Box>
    </Flex>
  )
);

export default MiniUploadContent;
