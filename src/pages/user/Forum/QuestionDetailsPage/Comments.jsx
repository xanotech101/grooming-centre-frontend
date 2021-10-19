import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { capitalizeWords } from "../../../../utils";
import useComments from "./hooks/useComments";

const Comments = () => {
  const { comments } = useComments();
  const commentsIsEmpty =
    !comments.loading && !comments.err && !comments.data?.length ? true : false;

  return (
    <Box paddingTop={5} paddingBottom={10}>
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
          <Header />
          <CommentForm />
          <CommentList data={comments.data} />
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
  return data.map((comment) => <Box key={comment.id}>{comment.body}</Box>);
};

const CommentForm = () => (
  <Box
    as="form"
    shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
    rounded="5px"
    padding={6}
    margin={1}
    marginBottom={5}
  >
    <Input placeholder="Type here your wise suggestion" marginBottom={3} />

    <Flex justifyContent="flex-end">
      <Button type="submit">Suggest</Button>
    </Flex>
  </Box>
);

const Header = () => (
  <Box marginBottom={5} textAlign="center">
    <Heading color="accent.2" fontSize="heading.h4">
      Comments
    </Heading>
  </Box>
);

export default Comments;
