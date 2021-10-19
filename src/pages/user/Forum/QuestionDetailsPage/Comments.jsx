import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import {
  Button,
  CommentListCard,
  Heading,
  Input,
  ReplyListCard,
  Text,
} from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { userForumAddComment } from "../../../../services";
import { capitalizeFirstLetter, capitalizeWords } from "../../../../utils";
import useComments from "./hooks/useComments";

const Comments = () => {
  const { comments } = useComments();
  const commentsIsEmpty =
    !comments.loading && !comments.err && !comments.data?.length ? true : false;

  return (
    <Box paddingTop={3} paddingBottom={10}>
      {comments.loading && <PageLoaderLayout height="70%" width="100%" />}

      {comments.err && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3} color="red.500">
            {capitalizeWords(comments.err)}
          </Heading>
        </PageLoaderLayout>
      )}

      {commentsIsEmpty && <NoComments />}

      {comments.data?.length ? (
        <>
          <CommentForm />
          <CommentList data={comments.data} />
          <ReplyListCard /> {/* TODO: remove */}
        </>
      ) : null}
    </Box>
  );
};

const NoComments = () => {
  const [commentClicked, setCommentClicked] = useState(false);

  return !commentClicked ? (
    <PageLoaderLayout height="70%" width="100%">
      <Heading as="h3" marginBottom={3}>
        No Comments
      </Heading>
      <Text as="level3" marginBottom={7}>
        Be the first to comment under this thread.
      </Text>

      <Button sm onClick={() => setCommentClicked(true)}>
        Comment
      </Button>
    </PageLoaderLayout>
  ) : (
    <CommentForm />
  );
};

const CommentList = ({ data }) => {
  return data.map((comment) => (
    <CommentListCard key={comment.id} {...comment} />
  ));
};

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

export default Comments;
