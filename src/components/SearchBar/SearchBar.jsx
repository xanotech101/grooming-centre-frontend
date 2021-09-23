import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import { BsSearch } from "react-icons/bs";
import { Input } from "..";
import PropTypes from "prop-types";

export const SearchBar = ({ adminHeaderStyle, ...rest }) => {
  adminHeaderStyle = adminHeaderStyle
    ? {
        backgroundColor: "secondary.7",
        textColor: "white",
        rounded: "2rem",
        border: "none",
      }
    : {};

  return (
    <Flex
      as="form"
      border="1px"
      textColor="accent.2"
      rounded="4px"
      overflow="hidden"
      {...adminHeaderStyle}
      {...rest}
    >
      <VisuallyHidden as="label" htmlFor="search">
        Search Courses
      </VisuallyHidden>
      <Input
        border="none"
        id="search"
        placeholder="Search Courses"
        paddingLeft={2}
        _focus={{
          textColor: "black",
          transform: "scale(1.01)",
          "&::placeholder": {
            textColor: "black",
          },
        }}
      />

      <IconButton
        _focus={{
          fontSize: "20px",
          textColor: "primary.base",
          backgroundColor: "secondary.1",
        }}
        _hover={
          adminHeaderStyle && {
            backgroundColor: "secondary.6",
          }
        }
        rounded="none"
        variant="ghost"
        width="60px"
        order={-1}
      >
        <BsSearch />
      </IconButton>
    </Flex>
  );
};

SearchBar.propTypes = {
  adminHeaderStyle: PropTypes.bool,
};
