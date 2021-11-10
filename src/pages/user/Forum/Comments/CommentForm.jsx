import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";
import { Button, Heading, Textarea } from "../../../../components";
import { useApp } from "../../../../contexts";
import {
  userForumAddComment,
  userForumAddReply,
  userForumEditComment,
} from "../../../../services";
import { capitalizeFirstLetter, getFullName } from "../../../../utils";

const CommentForm = ({
  initValue,
  isReply,
  commentId,
  replyId,
  onReplySuccess,
  onCommentSuccess,
  onCancel,
  mute,
  inputMinHeight,
}) => {
  const { id: questionId } = useParams();
  const toast = useToast();
  const {
    state: { user },
  } = useApp();

  const isEditMode = initValue ? true : false;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  // Init `text` value
  useEffect(() => {
    let isMount = true;

    if (initValue && isMount) {
      setValue("text", initValue);
    }

    return () => {
      isMount = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  const onSubmit = async (data) => {
    try {
      const body = { comment: data.text, questionId, userId: user?.id };

      const { message, data: responseData } = await (isEditMode
        ? userForumEditComment(replyId || commentId, body)
        : isReply
        ? userForumAddReply({ ...body, commentId })
        : userForumAddComment(body));

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      const currentUser = {
        id: user?.id,
        profilePics: user?.profilePics,
        fullName: getFullName(user),
      };

      if (isReply) {
        const reply = {
          ...responseData,
          user: currentUser,
        };

        onReplySuccess(commentId, reply);
      } else {
        const comment = {
          ...responseData,
          questionId: null,
          user: currentUser,
          replies: responseData.replies || [],
        };

        onCommentSuccess(comment);
      }

      reset();
      onCancel?.();
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
      <Textarea
        id={`${isReply ? "reply" : "comment"}--${uuid()}`}
        placeholder="Type here your wise suggestion"
        marginBottom={3}
        {...register("text", {
          required: true,
        })}
        minHeight={mute ? inputMinHeight || "60px" : "100px"}
      ></Textarea>

      <Flex justifyContent="flex-end">
        {onCancel && (
          <Button type="button" sm={mute} onClick={onCancel} ghost mr={2}>
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          sm={mute}
        >
          {isEditMode ? "Update" : isReply ? "Reply" : "Comment"}
        </Button>
      </Flex>
    </Box>
  );

  return (
    <>
      {!mute && <CommentsHeader />}

      {mute ? (
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

export const CommentsHeader = () => (
  <Box marginBottom={5} textAlign="center">
    <Heading color="accent.2" fontSize="heading.h4">
      Comments
    </Heading>
  </Box>
);

export default CommentForm;
