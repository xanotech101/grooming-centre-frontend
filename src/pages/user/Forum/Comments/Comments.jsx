import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { Button, Heading, Text } from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { capitalizeWords } from "../../../../utils";
import CommentForm from "./CommentForm";

const Comments = ({ commentsManager, children, canAddComment }) => {
  const { comments, handleAddReply, handleAddComment } = commentsManager;
  const commentsIsEmpty =
    !comments.loading && !comments.err && !comments.data?.length ? true : false;

  return (
    <Box paddingTop={3} paddingBottom={10}>
      {comments.loading && <PageLoaderLayout height="30vh" width="100%" />}

      {comments.err && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3} color="red.500">
            {capitalizeWords(comments.err)}
          </Heading>
        </PageLoaderLayout>
      )}

      {commentsIsEmpty && <NoComments canAddComment={canAddComment} />}

      {comments.data?.length
        ? children({ handleAddComment, comments, handleAddReply })
        : null}
    </Box>
  );
};

const NoComments = ({ canAddComment }) => {
  const [commentClicked, setCommentClicked] = useState(false);

  return !commentClicked ? (
    <PageLoaderLayout height="70%" width="100%">
      <Heading as="h3" marginBottom={3}>
        No Comments
      </Heading>
      <Text as="level3" marginBottom={7}>
        Be the first to comment under this thread.
      </Text>

      <Button sm onClick={() => canAddComment && setCommentClicked(true)}>
        Comment
      </Button>
    </PageLoaderLayout>
  ) : (
    canAddComment && <CommentForm />
  );
};

export default Comments;
