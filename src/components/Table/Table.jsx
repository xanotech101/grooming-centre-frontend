import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { Button, Checkbox, SearchBar } from "..";

export const Table = ({ filterControls, sortControl }) => {
  sortControl = sortControl === undefined && filterControls ? true : false;

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <SearchBar
          placeholder="Name, role, email, department"
          // width="475px"
          width="375px"
          sm
        />

        {filterControls && (
          <ButtonGroup data-testid="filter-buttons">
            <FilterButton
              triggerText="%Grade point"
              secondary
              sm
              backgroundColor="white"
              color="accent.3"
              rightIcon={<AiOutlineDown />}
            ></FilterButton>
            <FilterButton
              triggerText="Department"
              secondary
              sm
              backgroundColor="white"
              color="accent.3"
              rightIcon={<AiOutlineDown />}
            ></FilterButton>
            <FilterButton
              triggerText="Role"
              secondary
              sm
              backgroundColor="white"
              color="accent.3"
              rightIcon={<AiOutlineDown />}
            ></FilterButton>
            {sortControl && (
              <FilterButton
                triggerText="Sort"
                secondary
                sm
                backgroundColor="white"
                color="accent.3"
                rightIcon={<FaSortAmountUpAlt />}
              ></FilterButton>
            )}
          </ButtonGroup>
        )}
      </Flex>

      <Box as="table">
        <Box as="thead"></Box>
        <Box as="tbody"></Box>
      </Box>
    </Box>
  );
};

const FilterButton = ({ triggerText, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  // const handleClose = () => setIsOpen(false);

  const renderContent = () => (
    <Box data-testid="filter-body">{children || <FilterBody />}</Box>
  );

  return (
    <Box position="relative">
      <Button data-testid="filter-button" {...rest} onClick={handleOpen}>
        {triggerText}
      </Button>

      {isOpen && renderContent()}
    </Box>
  );
};

const FilterBody = () => {
  return (
    <Box
      as="form"
      backgroundColor="white"
      position="absolute"
      minWidth="100%"
      top="calc(100% + 5px)"
      rounded="4px"
      border="1px"
      borderColor="accent.3"
    >
      <Stack padding={2}>
        <Checkbox label="1 to 30" />
        <Checkbox label="31 to 50" />
        <Checkbox label="51 to 70" />
        <Checkbox label="71 to 100" />
      </Stack>
    </Box>
  );
};

Table.propTypes = {
  filterControls: PropTypes.bool,
  sortControl: PropTypes.bool,
};
