import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import { RiRadioButtonFill } from 'react-icons/ri';
import { MdRadioButtonUnchecked } from 'react-icons/md';

const AssessmentStart = () => {
  const [icon, setIcon] = useState(false);
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
    >
      <h1
        style={{
          width: '100%',
          color: 'white',
          height: '80px',
          background: '#5A051A',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '20px',
          padding: '20px',
          display: 'flex',
        }}
      >
        HTML Assesment
      </h1>
      <Box
        width="98%"
        marginLeft="auto"
        marginRight="auto"
        display="flex"
        gap="30px"
      >
        <div
          style={{
            width: '60%',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14 px',
          }}
        >
          <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>
            Question 1 of 20
          </h2>
          <hr style={{ marginTop: '10px' }} />
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
          >
            <p style={{ marginTop: '10px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
              eros cursus nunc integer amet donec rhoncus ut posuere ?
            </p>
            <p
              onClick={() => setIcon((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {icon ? (
                <RiRadioButtonFill size="20px" style={{ color: '#800020' }} />
              ) : (
                <MdRadioButtonUnchecked
                  size="20px"
                  style={{ color: '#800020' }}
                />
              )}{' '}
              Lorem Ipsum
            </p>
            <p
              onClick={() => setIcon((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {icon ? (
                <RiRadioButtonFill size="20px" style={{ color: '#800020' }} />
              ) : (
                <MdRadioButtonUnchecked
                  size="20px"
                  style={{ color: '#800020' }}
                />
              )}{' '}
              Lorem Ipsum
            </p>
            <p
              onClick={() => setIcon((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {icon ? (
                <RiRadioButtonFill size="20px" style={{ color: '#800020' }} />
              ) : (
                <MdRadioButtonUnchecked
                  size="20px"
                  style={{ color: '#800020' }}
                />
              )}{' '}
              Lorem Ipsum
            </p>
            <p
              onClick={() => setIcon((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {icon ? (
                <RiRadioButtonFill size="20px" style={{ color: '#800020' }} />
              ) : (
                <MdRadioButtonUnchecked
                  size="20px"
                  style={{ color: '#800020' }}
                />
              )}{' '}
              Lorem Ipsum
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
            }}
          >
            <p
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '40px',
                paddingRight: '40px',
                color: '#800020',
                fontWeight: 'bold',
                border: '2px solid #800020 ',
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              Previous
            </p>
            <p
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '45px',
                paddingRight: '45px',
                color: 'white',
                background: '#800020',
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              Next
            </p>
          </div>
        </div>
        <div
          style={{
            height: '470px',
            width: '40%',
            marginTop: '10px',
            borderLeft: '1px solid rgba(105, 115, 134, 0.31)',
          }}
        >
          <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>Time Left</h2>
          <hr style={{ marginTop: '10px' }} />
        </div>
      </Box>
    </Box>
  );
};

export const AssessmentStartRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AssessmentStart {...props} />} />;
};
