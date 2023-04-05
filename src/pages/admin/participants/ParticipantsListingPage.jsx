import { Box } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import { Button, Heading } from '../../../components';
import { HEADING, MODAL, DETAILS } from '../../../constants';
import dots from '../../../assets/images/dots.png';
import { useQueryParams } from '../../../hooks';
import {
  adminGetStandaloneExaminationParticipants,
  getStandaloneExaminationParticipants,
} from '../../../services';

const ParticipantsListingPage = () => {
  const examinationId = useQueryParams().get('examination');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState('pending');
  const [statusStyle, setStatusStyle] = useState('');
  const [details, setDetails] = useState({
    loading: false,
    err: null,
  });

  const handleDotsClick = (e, id) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
    setId(id);
  };

  const getParticipants = useCallback(async () => {
    setDetails({ loading: true });
    try {
      const { users, departments } = await getStandaloneExaminationParticipants(
        examinationId
      );
      setUsers(users);
      setDepartments(departments);
      setDetails({ loading: false });
    } catch (error) {
      setDetails({ err: error.message });
      setDetails({ loading: false });
    }
  }, [examinationId]);
  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

  console.log(users);

  const handleModalSelect = (value, myid) => {};

  return (
    <Box marginLeft="20px" marginRight="25px" marginTop="20px">
      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'flex-start', lg: 'center' }}
        paddingBottom={5}
        gap={5}
        marginBottom={5}
      >
        <Heading as="h1" fontSize="heading.h4">
          By Users
        </Heading>

        <Button
          link={`/admin/standalone-exams/participants/create?examination=${examinationId}`}
        >
          Add Participants
        </Button>
      </Box>

      <div className="users_details">
        <table className="content-table">
          <thead>
            <tr>
              {HEADING.map((item) => (
                <th key={item?.id}>{item?.desc}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr
                key={item?.id}
                // onClick={() => navigate(`users/${item?.userName}`)}
              >
                <td>{index + 1}</td>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td>
                <td>{item?.username}</td>
                <td>{item?.email}</td>
                <td>{item?.gender}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: 'red',
                      padding: '5px',
                      textAlign: 'center',
                      borderRadius: '5px',
                    }}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export const ParticipantsListingPageRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => <ParticipantsListingPage {...props} />}
    />
  );
};

export default ParticipantsListingPageRoute;
