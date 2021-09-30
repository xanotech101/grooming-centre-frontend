import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { useState } from "react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { Button, Checkbox, SearchBar, Text } from "../..";

const Header = ({ filterControls }) => {
  return (
    <Flex
      as="header"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
    >
      <SearchBar
        placeholder="Name, role, email, department"
        // width="475px"
        width="375px"
        sm
      />

      {filterControls && <FilterButtonsGroup data={filterControls} />}
    </Flex>
  );
};

const FilterButtonsGroup = ({ data }) => {
  const [tags, setTags] = useState({
    // "%Grade point": [{ text: "1 to 30" }],
  });

  const handleApplyFilter = (filterKey, filters) => {
    setTags((prev) => ({
      ...prev,
      [filterKey]: filters,
    }));
  };

  const handleTagClick = (tagSection, tagText) => {
    const newTags = {
      ...tags,
      [tagSection]: tags[tagSection].filter((tag) => tag.text !== tagText),
    };
    setTags(newTags);
  };

  const renderTags = () => {
    const tagSections = data
      .filter((item) => !item.noFilterTags)
      .reduce((prev, curr) => {
        const tagSection = { name: curr.triggerText };
        prev.push(tagSection);

        return prev;
      }, []);

    return tagSections.map((tagSection, index) =>
      tags[tagSection.name]?.length ? (
        <Box
          key={tagSection.name}
          // data-testid={`${tagSection.name}-tag-section`}
          borderLeft={index && "1px"}
          borderColor="accent.2"
          marginLeft={1}
          paddingLeft={1}
        >
          {tags[tagSection.name]?.map((tag) => (
            <Tag
              marginX={1}
              data-testid="filter-tag"
              size="md"
              key={tag.text}
              borderRadius="full"
              variant="solid"
            >
              <TagLabel>{tag.text}</TagLabel>
              <TagCloseButton
                onClick={handleTagClick.bind(null, tagSection.name, tag.text)}
              />
            </Tag>
          ))}
        </Box>
      ) : null
    );
  };

  const renderButtons = () =>
    data.map((filterControl) => (
      <FilterButton
        key={filterControl.triggerText}
        data={filterControl}
        onApplyFilter={handleApplyFilter}
        tags={tags}
      />
    ));

  return (
    <>
      <ButtonGroup data-testid="filter-button-group">
        {renderButtons()}
      </ButtonGroup>

      <Flex minWidth="100%" justifyContent="flex-end" marginTop={2}>
        {renderTags()}
      </Flex>
    </>
  );
};

const FilterButton = ({ children, data, tags, onApplyFilter, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderContent = () => (
    <Box data-testid="filter-body">
      {children || (
        <FilterBody
          data={data}
          onClose={handleClose}
          onApplyFilter={onApplyFilter}
          tags={tags[data.triggerText]}
        />
      )}
    </Box>
  );

  return (
    <Box position="relative">
      <Button
        data-testid={`filter-control, ${data.triggerText}`}
        onClick={handleOpen}
        secondary
        sm
        backgroundColor="white"
        color="accent.3"
        rightIcon={data.triggerIcon || <AiOutlineDown />}
        {...rest}
      >
        {data.triggerText}
      </Button>

      {isOpen && renderContent()}
    </Box>
  );
};

export const FilterBody = ({ data, tags = [], onClose, onApplyFilter }) => {
  const [selectedChecks, setSelectedChecks] = useState(tags);

  const handleCheckboxChange = ({ target: { name, checked } }) => {
    const allSelected = [...selectedChecks];

    if (checked) {
      allSelected.push({ text: name });
    } else {
      const index = allSelected.findIndex((selected) => selected.text === name);

      if (index !== -1) {
        allSelected.splice(index, 1);
      }
    }

    setSelectedChecks(allSelected);
  };

  const handleApply = () => {
    onClose();
    onApplyFilter(data.triggerText, selectedChecks);
  };

  const handleClearAll = () => {
    const selectedChecks = [];
    setSelectedChecks(selectedChecks);

    onApplyFilter(data.triggerText, selectedChecks);
    onClose();
  };

  return (
    <Box
      backgroundColor="white"
      position="absolute"
      zIndex={1}
      width={data.width}
      top="calc(100% + 5px)"
      right={data.position === "right-bottom" ? 0 : undefined}
      rounded="4px"
      border="1px"
      borderColor="accent.3"
      shadow="md"
    >
      <form>
        {data.body.checks && (
          <Stack padding={2}>
            {data.body.checks.map((check, index) => (
              <Checkbox
                key={index}
                label={check.label}
                name={check.label}
                defaultChecked={selectedChecks.find(
                  (selected) => check.label === selected.text
                )}
                onChange={handleCheckboxChange}
              />
            ))}
          </Stack>
        )}

        {data.body.radios && (
          <>
            <Flex justifyContent="flex-end">
              <Button
                ghost
                xs
                fontSize="heading.h4"
                onClick={onClose}
                data-testid="close"
              >
                <AiOutlineClose />
              </Button>
            </Flex>

            <Stack paddingBottom={3}>
              {data.body.radios.map((radio, index) => (
                <Box
                  key={index}
                  tabIndex={0}
                  role="button"
                  data-testid="radio"
                  cursor="pointer"
                  _hover={{ backgroundColor: "accent.1" }}
                  paddingY={1}
                  paddingX={2}
                  onClick={onClose}
                >
                  <Text>{radio.label}</Text>
                </Box>
              ))}
            </Stack>
          </>
        )}

        {!data.body.radios && data.body.checks && (
          <HStack
            as="footer"
            justifyContent="space-between"
            borderTop="1px"
            borderColor="accent.2"
            padding={2}
          >
            <Button ghost xs onClick={handleClearAll}>
              Clear all
            </Button>

            <Button xs onClick={handleApply}>
              Apply
            </Button>
          </HStack>
        )}
      </form>
    </Box>
  );
};

export default Header;
