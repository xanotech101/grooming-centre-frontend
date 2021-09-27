import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { Button, Checkbox, SearchBar, Text } from "../..";

const Header = ({ filterControls }) => {
  return (
    <Flex as-="header" alignItems="center" justifyContent="space-between">
      <SearchBar
        placeholder="Name, role, email, department"
        // width="475px"
        width="375px"
        sm
      />

      {filterControls && (
        <ButtonGroup data-testid="filter-button-group">
          {filterControls?.map((filterControl) => (
            <FilterButton
              key={filterControl.triggerText}
              data={filterControl}
            />
          ))}
        </ButtonGroup>
      )}
    </Flex>
  );
};

const FilterButton = ({ children, data, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderContent = () => (
    <Box data-testid="filter-body">
      {children || (
        <FilterBody
          width={data.width}
          body={data.body}
          position={data.position}
          onClose={handleClose}
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

const FilterBody = ({ width = "100%", body, position, onClose }) => {
  return (
    <Box
      backgroundColor="white"
      position="absolute"
      width={width}
      top="calc(100% + 5px)"
      right={position === "right-bottom" ? 0 : undefined}
      rounded="4px"
      border="1px"
      borderColor="accent.3"
      shadow="md"
    >
      <form>
        {body.checks && (
          <Stack padding={2}>
            {body.checks.map((check, index) => (
              <Checkbox label={check.label} key={index} />
            ))}
          </Stack>
        )}

        {body.radios && (
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
              {body.radios.map((radio, index) => (
                <Box
                  key={index}
                  tabIndex={0}
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

        {!body.radios && body.checks && (
          <HStack
            as="footer"
            justifyContent="space-between"
            borderTop="1px"
            borderColor="accent.2"
            padding={2}
          >
            <Button ghost xs onClick={onClose}>
              Clear all
            </Button>

            <Button xs onClick={onClose}>
              Apply
            </Button>
          </HStack>
        )}
      </form>
    </Box>
  );
};

export default Header;
