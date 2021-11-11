import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";
import { Button, Heading, Image, Input, Text } from "../../../../components";
import { useApp } from "../../../../contexts";
import { useDebounceTyping, useFetch } from "../../../../hooks";
import {
  userForumAddComment,
  userForumAddReply,
  userForumEditComment,
  userForumGetUsernames,
} from "../../../../services";
import { capitalizeFirstLetter, getFullName } from "../../../../utils";
import thumbnailPlaceholder from "../../../../assets/images/onboarding1.png";

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
    getValues,
    watch,
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

  const onSubmit = (handleClearUsernameResults) => async (data) => {
    handleClearUsernameResults();
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

  // const [selectedUsernames, setSelectedUsernames] = useState([]);
  // const [matchedTypedUserName, setMatchedTypedUserName] = useState(null);

  const {
    resource: usernameResults,
    // handleFetchResource: handleFetchUsernameResults,
    handleClearResource: handleClearUsernameResults,
  } = useFetch();

  // const debounce = useDebounceTyping();
  useEffect(() => {
    const subscription = watch(({ text }) => {
      handleClearUsernameResults();

      const matched =
        text
          ?.match(/^((.){0,}(\s))?(@)([\da-z_]){1,}/gi)?.[0]
          ?.match(/(@)([\da-z_]){1,}/gi) || [];

      // setMatchedTypedUserName(matched);

      // matched.forEach((m) => {
      //   const foundUserName = selectedUsernames.find(
      //     (username) => username === m
      //   );

      //   if (!foundUserName) {
      //     debounce.handleType(null, () => setCurrentTypedUserName(m));
      //   }
      // });
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  // const fetchUsernameResults = useCallback(
  //   async () =>
  //     await (
  //       await userForumGetUsernames({
  //         username: currentTypedUserName.replace("@", ""),
  //       })
  //     ).usernames,
  //   [currentTypedUserName]
  // );

  // useEffect(() => {
  //   if (currentTypedUserName) {
  //     handleFetchUsernameResults({ fetcher: fetchUsernameResults });
  //   }
  // }, [currentTypedUserName, fetchUsernameResults, handleFetchUsernameResults]);

  // useEffect(() => {
  //   if (usernameResults.err)
  //     toast({
  //       description: capitalizeFirstLetter(usernameResults.err),
  //       position: "top",
  //       status: "error",
  //     });
  // }, [toast, usernameResults.err]);

  const renderContent = () => (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit(handleClearUsernameResults))}
    >
      <Box position="relative">
        {usernameResults.data && (
          <Box
            position="absolute"
            transform="translateY(-100%)"
            top="0"
            left="0"
            maxH="100px"
            w="100%"
            rounded="md"
            shadow="md"
            bg="accent.1"
            overflowY="auto"
            py={2}
            // zIndex={100}
          >
            <Box as="ul">
              {usernameResults.data.map((u) => (
                <Flex
                  key={u.id}
                  as="li"
                  py={1}
                  px={2}
                  borderTop="1px"
                  borderColor="accent.2"
                  _hover={{ bg: "white", cursor: "pointer" }}
                  alignItems="center"
                  // onClick={handleUserNameSelect.bind(null, u)}
                >
                  <Image
                    src={u.profilePics || thumbnailPlaceholder}
                    boxSize="30px"
                    rounded="full"
                  />
                  <Text ml={2} bold>
                    @{u.name}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Box>
        )}

        <Input
          id={`${isReply ? "reply" : "comment"}--${uuid()}`}
          placeholder="Type here your wise suggestion"
          // onKeyPress={({ key }) => {
          //   console.log(1 + key + 1, key === " ");

          //   if (key === " " || key === "." || key === "," || key === "Enter") {
          //     matchedTypedUserName.forEach((m) => {
          //       console.log(m);
          //       selectedUsernames.forEach((u) => {
          //         if (`@${u.name}` !== m) {
          //           setValue("text", getValues("text").replace(m, ""));
          //         }
          //       });
          //     });
          //   }
          // }}
          marginBottom={3}
          {...register("text", {
            required: true,
          })}
          minHeight={mute ? (inputMinHeight ? "50px" : "40px") : "50px"}
        />
      </Box>

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
