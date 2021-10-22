import Icon from "@chakra-ui/icon";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BiComment } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { Image, Link, SelectedTags, Text } from "..";
import thumbnailPlaceholder from "../../assets/images/onboarding1.png";
import { capitalizeWords } from "../../utils";
import { Button } from "../";

export const QuestionListCard = ({
  id,
  title,
  body,
  commentCount,
  tags,
  user,
  disabled,
  createdAt,
}) => {
  const boxStyle = {
    boxShadow: "2px 1px 5px rgba(0, 0, 0, 0.15)",
    margin: "4px",
    marginBottom: "28px",
    display: "block",
    borderRadius: "5px",
  };

  return (
    <Stack
      padding={6}
      spacing={4}
      {...boxStyle}
      position="relative"
      _hover={
        !disabled && {
          transform: "scale(1.005)",
          cursor: "pointer",
        }
      }
    >
      {!disabled && (
        <Link
          href={`/forum/questions/details/${id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></Link>
      )}

      <Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
        <HStack spacing={5}>
          <Image
            src={user?.profilePics || thumbnailPlaceholder}
            boxSize="40px"
            rounded="full"
          />

          <Box flex={1}>
            <Text bold>{capitalizeWords(user.fullName)}</Text>
            <Text as="level5" color="accent.3">
              {createdAt}
            </Text>
          </Box>
        </HStack>

        <ForumMessageCardMoreIconButton position="relative" />
      </Flex>

      <Text bold as="level3">
        {title}
      </Text>

      <Text>{body}</Text>

      <Flex justifyContent="space-between" alignItems="center">
        <SelectedTags tags={tags} />

        <Flex>
          <Icon fontSize="heading.h4" transform="translateY(3px)">
            <BiComment />
          </Icon>

          <Text>{commentCount}</Text>
        </Flex>
      </Flex>
    </Stack>
  );
};

export const ForumMessageCardMoreIconButton = ({
  context = "comment",
  ...rest
}) => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        padding={2}
        rounded="full"
        _hover={{ backgroundColor: "secondary.05" }}
        {...rest}
      >
        <HiDotsVertical />
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        <MenuItem>Edit {context}</MenuItem>

        <DeleteMenuItemButton context={context} />
      </MenuList>
    </Menu>
  );
};

function DeleteMenuItemButton({ context }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem color="secondary.6" onClick={onOpen}>
        Delete {context}
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            Are you sure you want to continue? This action cannot be reversed.
          </ModalBody>

          <ModalFooter>
            <Button marginRight={3} onClick={onClose} sm ghost>
              Close
            </Button>
            <Button sm>Delete {context}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

QuestionListCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  commentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string,
    profilePics: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
