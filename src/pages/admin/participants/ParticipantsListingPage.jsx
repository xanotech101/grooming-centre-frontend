import { Box } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';
import { Button, Heading } from '../../../components';
import { HEADING, HEADING_DEPARTMENTS } from '../../../constants';
import { useQueryParams } from '../../../hooks';
import {
  deleteStandaloneExaminationParticipants,
  getStandaloneExaminationParticipants,
} from '../../../services';
import { capitalizeFirstLetter } from '../../../utils';
import ParticipantsPagination from './ParticipantsPagination';
import { useHistory } from 'react-router-dom';

const ParticipantsListingPage = () => {
  const toast = useToast();
  const push = useHistory();
  const examinationId = useQueryParams().get('examination');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [depsCurrentPage, setDepsCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [depsRecordsPerPage, setDepsRecordsPerPage] = useState(5);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const depslastIndex = depsCurrentPage * depsRecordsPerPage;
  const depsfirstIndex = depslastIndex - depsRecordsPerPage;

  const [details, setDetails] = useState({
    loading: false,
    err: null,
  });

  const handleDelete = async (id) => {
    try {
      const { message } = await deleteStandaloneExaminationParticipants(id);
      toast({
        description: capitalizeFirstLetter(message),
        position: 'top',
        status: 'success',
      });
      window.location.reload(true);
    } catch (error) {
      toast({
        description: error.message,
        position: 'top',
        status: 'error',
      });
    }
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

  const usersRecord = users?.slice(firstIndex, lastIndex);

  const depsRecord = departments?.slice(depsfirstIndex, depslastIndex);

  const npages = Math.ceil(users.length / recordsPerPage);

  const nDepspages = Math.ceil(departments.length / depsRecordsPerPage);

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

      {/* for users */}
      <div className="users_details">
        <table className="content-table">
          <thead>
            <tr>
              {HEADING.map((item, i) => (
                <th key={i}>{item?.desc}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersRecord?.map((item, index) => (
              <tr key={index}>
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
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(item?.id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ParticipantsPagination
          documentCount={usersRecord?.length}
          totalCount={users?.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          nPages={npages}
          name={'user'}
        />
      </div>

      {/* for departments */}

      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'flex-start', lg: 'center' }}
        paddingBottom={5}
        gap={5}
        marginTop="50px"
      >
        <Heading as="h1" fontSize="heading.h4">
          By Departments
        </Heading>
      </Box>

      <div className="users_details">
        <table className="content-table">
          <thead>
            <tr>
              {HEADING_DEPARTMENTS?.map((item) => (
                <th key={item?.id}>{item?.desc}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {depsRecord?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: 'red',
                      padding: '5px',
                      textAlign: 'center',
                      borderRadius: '5px',
                      width: '50%',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(item?.id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ParticipantsPagination
          documentCount={depsRecord?.length}
          totalCount={departments.length}
          nPages={nDepspages}
          currentPage={depsCurrentPage}
          setCurrentPage={setDepsCurrentPage}
          recordsPerPage={depsRecordsPerPage}
          setRecordsPerPage={setDepsRecordsPerPage}
          firstIndex={depsfirstIndex}
          lastIndex={depslastIndex}
          name={'docs'}
        />
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
