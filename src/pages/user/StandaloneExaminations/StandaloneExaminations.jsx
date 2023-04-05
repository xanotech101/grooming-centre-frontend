import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Link, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Heading, Image, Text } from '../../../components';
import { maxWidthStyles_userPages } from '../../../theme/breakpoints';
import coverImagePlaceholder from '../../../assets/images/events-banner.svg';
import TestImg from '../../../assets/images/onboarding1.png';
import { pageWrapperSpacing_userPages } from '../../../theme/breakpoints';
import { color } from '@chakra-ui/react';
import { AiFillClockCircle } from 'react-icons/ai';

const mockItems = [
  {
    id: 1,
    image: TestImg,
    status: 'completed',
    name: 'John Doe',
    course: 'Hausa',
    start: '10/12/2022',
    score: '30%',
    duration: '0hrs 27mins',
  },
  {
    id: 2,
    image: TestImg,
    status: 'uncompleted',
    name: 'John Doe',
    course: 'Seamless Training',
    start: '10/12/2022',
    score: '40%',
    duration: '0hrs 27mins',
  },
  {
    id: 3,
    image: TestImg,
    status: 'in-progress',
    name: 'John Doe',
    course: 'Igbo',
    start: '10/12/2022',
    score: '50%',
    duration: '0hrs 27mins',
  },
  {
    id: 4,
    image: TestImg,
    status: 'uncompleted',
    name: 'John Doe',
    course: 'Yoruba',
    start: '10/12/2022',
    score: '0%',
    duration: '0hrs 27mins',
  },
];

const StandaloneExaminations = () => {
  return (
    <Box
      // {...maxWidthStyles_userPages}
      paddingY={{ base: 2, laptop: 5 }}
      // paddingX={{ base: 2, laptop: 8, 'laptop-l': 5 }}
    >
      <Box
        as="section"
        padding={10}
        marginBottom={10}
        color="white"
        position="relative"
      >
        <Image
          src={coverImagePlaceholder}
          width="100%"
          height="100%"
          top={0}
          left={0}
          position="absolute"
          alt="Course Header"
        />

        <Stack
          spacing={7}
          position="relative"
          // zIndex={1}
          {...pageWrapperSpacing_userPages}
        >
          <Heading>Examinations</Heading>
          <Text as="level2">Exams for you</Text>
        </Stack>
      </Box>

      <Box
        width="98%"
        margin="auto"
        display="flex"
        flexWrap="wrap"
        cursor="pointer"
        justifyContent="space-between"
      >
        {mockItems.map((item) => (
          <Link to={`/standalone-exams/${item.id}`}>
            <Box
              height="280px"
              width="350px"
              marginBottom="18px"
              borderRadius="8px"
              boxShadow="lg"
              border="2px solid #f5f5f5"
              background="#fff"
              key={item.id}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#65172A',
                  alignItems: 'center',
                  padding: '4px',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              >
                <div
                  style={
                    item.status === 'uncompleted'
                      ? {
                          background: 'red',
                          color: '#f5f5f5',
                          fontSize: '14px',
                          paddingRight: '4px',
                          paddingLeft: '4px',
                          borderRadius: '5px',
                        }
                      : item.status === 'completed'
                      ? {
                          background: 'blue',
                          color: '#f5f5f5',
                          fontSize: '14px',
                          paddingRight: '4px',
                          paddingLeft: '4px',
                          borderRadius: '5px',
                        }
                      : {
                          background: '#27AE60',
                          color: '#f5f5f5',
                          fontSize: '14px',
                          paddingRight: '4px',
                          paddingLeft: '4px',
                          borderRadius: '5px',
                        }
                  }
                >
                  {item.status === 'uncompleted'
                    ? 'uncompleted'
                    : item.status === 'completed'
                    ? 'completed'
                    : 'in-progress'}
                </div>
                <p style={{ color: 'white' }}>{item.score}</p>
              </div>
              <div style={{ height: '130px' }}>
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={item.image}
                  alt={item}
                />
              </div>
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <p style={{ fontSize: '14px' }}>{item.name}</p>
                <p style={{ fontWeight: 'bold' }}>{item.course}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#697386',
                  }}
                >
                  <p style={{ fontSize: '14px' }}>Start: {item.start}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <AiFillClockCircle />
                    <p>{item.duration}</p>
                  </div>
                </div>
              </div>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export const StandalonePagesRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => <StandaloneExaminations {...props} />}
    />
  );
};
