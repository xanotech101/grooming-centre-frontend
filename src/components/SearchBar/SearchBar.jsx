import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import { BsSearch } from "react-icons/bs";
import { Input } from "..";
import PropTypes from "prop-types";

export const SearchBar = ({
  adminLayoutHeaderStyle,
  placeholder = "Search Courses",
  sm,
  ...rest
}) => {
  adminLayoutHeaderStyle = adminLayoutHeaderStyle
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
      backgroundColor="white"
      textColor="accent.2"
      rounded="4px"
      overflow="hidden"
      height={sm ? "33px" : "auto"}
      {...adminLayoutHeaderStyle}
      {...rest}
    >
      <VisuallyHidden as="label" htmlFor="search">
        Search Courses
      </VisuallyHidden>
      <Input
        border="none"
        id="search"
        type="search"
        placeholder={placeholder}
        paddingLeft={2}
        size={sm && "sm"}
        // color={query ? "black" : "inherit"}
        _focus={{
          textColor: adminLayoutHeaderStyle ? "white" : "black",
          transform: "scale(1.01)",
          "&::placeholder": {
            textColor: "black",
          },
        }}
      />

      <IconButton
        size={sm && "sm"}
        _focus={{
          fontSize: "20px",
          textColor: "primary.base",
          backgroundColor: "secondary.1",
        }}
        _hover={
          adminLayoutHeaderStyle && {
            backgroundColor: "secondary.6",
          }
        }
        rounded="none"
        variant="ghost"
        width="60px"
        order={-1}
        type="submit"
      >
        <BsSearch />
      </IconButton>
    </Flex>
  );
};

SearchBar.propTypes = {
  adminLayoutHeaderStyle: PropTypes.bool,
  placeholder: PropTypes.string,
  sm: PropTypes.bool,
};
