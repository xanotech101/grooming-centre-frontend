import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { Button, Heading, Text } from "../../../../../components";
import { PageLoaderLayout } from "../../../../../layouts";
import { capitalizeWords } from "../../../../../utils";
import useComments from "../hooks/useComments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Comments = () => {
  const { comments, handleAddReply, handleAddComment } = useComments();
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
          <CommentForm onCommentSuccess={handleAddComment} />
          <CommentList data={comments.data} onReplySuccess={handleAddReply} />
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

export default Comments;
