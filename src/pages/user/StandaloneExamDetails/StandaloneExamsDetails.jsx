import { Box } from '@chakra-ui/react';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AiFillClockCircle } from 'react-icons/ai';
import { MdVerified, MdPlayLesson } from 'react-icons/md';

const StandaloneExamsDetails = () => {
  const { examid } = useParams();
  return (
    <Box
      width="80%"
      margin="auto"
      marginTop="50px"
      height="550px"
      border="2px solid #f5f5f5"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      gap="30px"
      padding="40px"
    >
      <Box display="flex" gap="8px" flexDirection="column">
        <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>
          Assessment {examid}
        </h1>
        <h3 style={{ fontWeight: 'bold' }}>Topic: Introduction to HTML</h3>
        <div>
          <p style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <MdPlayLesson style={{ color: '#c4c4c4' }} />
            20 multiple choice questions
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <AiFillClockCircle style={{ color: '#c4c4c4' }} /> 60 minutes
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <MdVerified style={{ color: '#c4c4c4' }} />
            Score a minimum of 90% to earn a badge
          </p>
        </div>
      </Box>
      <hr />
      <Box>
        <h3 style={{ fontWeight: 'bold' }}>Before you start</h3>
        <ul className="my-bullet_point">
          <li>
            You must complete this assessment in one session — make sure your
            internet is reliable.
          </li>
          <li style={{ color: '#000' }}>
            You can only take this assessment once, so do well to put in your
            best.
          </li>
          <li>We won’t show your results to anyone without your permission.</li>
        </ul>
      </Box>
      <Link to="/exam-start">
        <div
          style={{
            background: '#800020',
            color: 'white',
            width: '150px',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '4px',
            display: 'flex',
            cursor: 'pointer',
            justifyContent: 'center',
          }}
        >
          Take Assessment
        </div>
      </Link>
    </Box>
  );
};

export const StandaloneExamsRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => <StandaloneExamsDetails {...props} />}
    />
  );
};
