import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";
import { Button, Heading, Input } from "../../../../../components";
import {
  userForumAddComment,
  userForumAddReply,
} from "../../../../../services";
import { capitalizeFirstLetter } from "../../../../../utils";

const CommentForm = ({ isReply, commentId }) => {
  const { id: questionId } = useParams();
  const toast = useToast();
  const id = commentId || questionId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const body = { id, text: data.text };

      const { message } = await (isReply
        ? userForumAddReply
        : userForumAddComment)(body);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      reset();
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  const renderContent = () => (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id={`${isReply ? "reply" : "comment"}--${uuid()}`}
        placeholder="Type here your wise suggestion"
        marginBottom={3}
        {...register("text", {
          required: true,
        })}
        size={isReply && "sm"}
      />

      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          sm={isReply}
        >
          Suggest
        </Button>
      </Flex>
    </Box>
  );

  return (
    <>
      {!isReply && <Header />}

      {isReply ? (
        renderContent()
      ) : (
        <Box
          shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
          paddingX={6}
          paddingY={3}
          margin={1}
          marginBottom={5}
        >
          {renderContent()}
        </Box>
      )}
    </>
  );
};

const Header = () => (
  <Box marginBottom={5} textAlign="center">
    <Heading color="accent.2" fontSize="heading.h4">
      Comments
    </Heading>
  </Box>
);

export default CommentForm;
