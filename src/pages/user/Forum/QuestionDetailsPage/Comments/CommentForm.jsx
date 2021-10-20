import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Button, Heading, Input } from "../../../../../components";
import { userForumAddComment } from "../../../../../services";
import { capitalizeFirstLetter } from "../../../../../utils";

const CommentForm = () => {
  const { id } = useParams();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const body = { questionId: id, commentText: data.comment };

      const { message } = await userForumAddComment(body);

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

  return (
    <>
      <Header />

      <Box
        as="form"
        shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
        paddingX={6}
        paddingY={3}
        margin={1}
        marginBottom={5}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="comment"
          placeholder="Type here your wise suggestion"
          marginBottom={3}
          {...register("comment", {
            required: true,
          })}
        />

        <Flex justifyContent="flex-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Suggest
          </Button>
        </Flex>
      </Box>
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
