import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Button } from '../../../components';

const departmentProps = [
  {
    id: 1,
    name: 'test1',
  },
  {
    id: 2,
    name: 'test2',
  },
  {
    id: 3,
    name: 'test3',
  },
  {
    id: 4,
    name: 'test4',
  },
  {
    id: 5,
    name: 'test5',
  },
];

const CreateParticipants = () => {
  const [value, setValue] = useState('Department');
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(<BiChevronDown size={20} />);
  const [inputValue, setInputValue] = useState('');
  console.log(value);

  const handleShowDropDown = () => {
    setOpen((prev) => !prev);
    if (open === true) {
      setIcon(<BiChevronUp size={20} />);
    } else {
      setIcon(<BiChevronDown size={20} />);
    }
  };
  return (
    <Box
      backgroundColor="#fff"
      borderRadius={5}
      width="85%"
      height="auto"
      display="flex"
      flexDirection="column"
      gap="40px"
      marginTop="50px"
      marginLeft="auto"
      marginRight="auto"
      padding="40px"
      marginBottom={5}
    >
      <Box display="flex" flexDirection="column" gap="10px">
        <Text fontWeight="400" as="level2">
          Assesment Participants
        </Text>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row" gap="300px">
            <Radio colorScheme="red" value="Department">
              By Departments
            </Radio>
            <Radio colorScheme="red" value="User">
              By Users
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Box display="flex" flexDirection="column" gap="2px">
        <Text fontWeight="400" as="level2" marginBottom={5}>
          Choose {value}
        </Text>
        <Box
          background="white"
          paddingTop="10px"
          paddingBottom="10px"
          paddingLeft="30px"
          paddingRight="8px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="4px"
          border="1px"
          borderColor="rgba(0, 0, 0, 0.32)"
          width="328px"
          onClick={() => handleShowDropDown()}
        >
          <input
            type="text"
            value={inputValue}
            placeholder={`Choose a ${value}`}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            style={{ outline: 'none', color: 'rgba(0, 0, 0, 0.6)' }}
          />
          {icon}
        </Box>
        <ul
          style={
            open
              ? {
                  listStyle: 'none',
                  marginTop: '5px',
                  width: '328px',
                  overflowY: 'auto',
                  maxHeight: '220px',
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                }
              : {
                  listStyle: 'none',
                  marginTop: '5px',
                  width: '328px',
                  overflowY: 'auto',
                  border: '0px',
                  maxHeight: '0px',
                }
          }
        >
          {departmentProps.map((value) => (
            <li
              key={value.id}
              style={
                value.name.toLowerCase().startsWith(inputValue)
                  ? {
                      display: 'flex',
                      justifyItems: 'center',
                      padding: '8px',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      gap: '20px',
                    }
                  : {
                      display: 'none',
                    }
              }
            >
              <input type="checkbox" />
              <p>{value.name}</p>
            </li>
          ))}
        </ul>
      </Box>
      <Box display="flex" justifyContent="space-between" marginBottom="20px">
        <Button secondary>Cancel</Button>
        <Button loadingText="Updating" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreateParticipants;
