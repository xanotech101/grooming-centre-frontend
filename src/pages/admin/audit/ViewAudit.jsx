import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/layout';
import { BreadcrumbItem } from '@chakra-ui/react';
import {
  Button,
  Heading,
  Table,
  Text,
  Breadcrumb,
  Link,
  Spinner,
} from '../../../components';
import { FaSortAmountUpAlt, FaUser, FaClock } from 'react-icons/fa';
import { AdminMainAreaWrapper } from '../../../layouts/admin/MainArea/Wrapper';
import { useToast } from '@chakra-ui/toast';
import { EmptyState } from '../../../layouts';
import { Tag } from '@chakra-ui/tag';
import { Avatar } from '@chakra-ui/avatar';
import { useTableRows } from '../../../hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ViewAudit = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data fetcher - replace with your actual API call
  const fetchAuditData = async (params = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual API endpoint
      const response = await fetch(`https://privateapi.groomingcentre.net/api/v1/admin/audit-logs?${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audit data');
      }

      const data = await response.json();
      
      // Transform the data to match table format
      const rows = data.data?.map(mapAuditToRow) || [];
      
      return { 
        rows, 
        showingDocumentsCount: data.showingDocumentsCount || rows.length,
        totalDocumentsCount: data.totalDocumentsCount || rows.length 
      };
    } catch (error) {
      console.error('Error fetching audit data:', error);
      setError(error.message);
      toast({
        description: 'Failed to load audit data',
        position: 'top',
        status: 'error',
      });
      return { rows: [], showingDocumentsCount: 0, totalDocumentsCount: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const mapAuditToRow = (audit) => ({
    id: audit.id,
    user: {
      firstName: audit.firstName,
      lastName: audit.lastName,
      username: audit.username,
      email: audit.email,
      avatar: audit.profilePics || null,
    },
    userRole: audit.userRole,
    departments: audit.departments || [],
    gender: audit.gender,
    lastLogin: audit.last_login,
    createdAt: audit.createdAt,
    updatedAt: audit.updatedAt,
  });

  const tableProps = {
    filterControls: [
      {
        triggerText: "User Role",
        queryKey: "userRole",
        width: "200px",
        body: {
          checks: [
            { label: "Admin", queryValue: "admin" },
            { label: "Super Admin", queryValue: "super admin" },
            { label: "User", queryValue: "user" },
            { label: "Instructor", queryValue: "instructor" },
          ],
        },
      },
      {
        triggerText: "Gender",
        queryKey: "gender",
        width: "150px",
        body: {
          checks: [
            { label: "Male", queryValue: "male" },
            { label: "Female", queryValue: "female" },
          ],
        },
      },
      {
        triggerText: "Sort",
        queryKey: "sort",
        triggerIcon: <FaSortAmountUpAlt />,
        width: "250px",
        position: "right-bottom",
        body: {
          radios: [
            {
              label: "Name: A-Z",
              queryValue: "asc",
              additionalParams: { sortBy: "firstName" },
            },
            {
              label: "Name: Z-A", 
              queryValue: "desc",
              additionalParams: { sortBy: "firstName" },
            },
            {
              label: "Last Login: Recent",
              queryValue: "desc",
              additionalParams: { sortBy: "last_login" },
            },
            {
              label: "Last Login: Oldest",
              queryValue: "asc", 
              additionalParams: { sortBy: "last_login" },
            },
            {
              label: "Created: Newest",
              queryValue: "desc",
              additionalParams: { sortBy: "createdAt" },
            },
            {
              label: "Created: Oldest",
              queryValue: "asc",
              additionalParams: { sortBy: "createdAt" },
            },
          ],
        },
      },
    ],

    columns: [
      {
        id: "user",
        key: "user",
        text: "User Information",
        fraction: "3fr",
        renderContent: (userData) => (
          <Flex alignItems="center" gap={3}>
            <Avatar
              size="sm"
              name={`${userData.firstName} ${userData.lastName}`}
              src={userData.avatar}
            />
            <Box>
              <Text fontWeight="semibold" fontSize="sm">
                {userData.firstName} {userData.lastName}
              </Text>
              <Text fontSize="xs" color="gray.500">
                @{userData.username}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {userData.email}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        id: "userRole",
        key: "userRole",
        text: "Role",
        fraction: "120px",
        renderContent: (role) => (
          <Tag
            size="sm"
            borderRadius="full"
            backgroundColor={
              role === 'super admin' ? 'red.100' :
              role === 'admin' ? 'blue.100' :
              role === 'instructor' ? 'green.100' : 'gray.100'
            }
            color={
              role === 'super admin' ? 'red.800' :
              role === 'admin' ? 'blue.800' :
              role === 'instructor' ? 'green.800' : 'gray.800'
            }
          >
            <Text textTransform="capitalize" fontWeight="semibold">
              {role}
            </Text>
          </Tag>
        ),
      },
      {
        id: "departments",
        key: "departments", 
        text: "Departments",
        fraction: "2fr",
        renderContent: (departments) => (
          <Box>
            {departments.length > 0 ? (
              <Flex flexWrap="wrap" gap={1}>
                {departments.slice(0, 2).map((dept, index) => (
                  <Tag key={index} size="xs" colorScheme="purple" variant="subtle">
                    {dept}
                  </Tag>
                ))}
                {departments.length > 2 && (
                  <Tag size="xs" colorScheme="gray" variant="subtle">
                    +{departments.length - 2} more
                  </Tag>
                )}
              </Flex>
            ) : (
              <Text fontSize="xs" color="gray.400">No departments</Text>
            )}
          </Box>
        ),
      },
      {
        id: "lastLogin",
        key: "lastLogin",
        text: "Last Login",
        fraction: "200px",
        renderContent: (lastLogin) => (
          <Box>
            {lastLogin ? (
              <>
                <Text fontSize="sm" fontWeight="medium">
                  {dayjs(lastLogin).format('DD/MM/YYYY')}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {dayjs(lastLogin).format('h:mm A')}
                </Text>
                <Text fontSize="xs" color="blue.500">
                  {dayjs(lastLogin).fromNow()}
                </Text>
              </>
            ) : (
              <Text fontSize="xs" color="gray.400">Never logged in</Text>
            )}
          </Box>
        ),
      },
      {
        id: "gender",
        key: "gender", 
        text: "Gender",
        fraction: "80px",
        renderContent: (gender) => (
          <Text fontSize="sm" textTransform="capitalize" color="gray.600">
            {gender || 'N/A'}
          </Text>
        ),
      },
    ],

    options: {
      action: [
        {
          text: "View Profile",
          link: (user) => `/admin/users/details/${user.id}/profile`,
        },
      ],
      selection: false, // Disable selection for audit logs
      pagination: true,
    },
  };

  const fetcher = (props) => async () => {
    return await fetchAuditData(props?.params);
  };

  const { rows, setRows, fetchRowItems } = useTableRows(fetcher);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="/admin/audit">Audit Logs</Link>
          </BreadcrumbItem>
        }
      />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px"
        borderColor="accent.2"
        paddingBottom={5}
        marginBottom={5}
      >
        <Box>
          <Heading as="h1" fontSize="heading.h3" marginBottom={2}>
            User Audit Logs
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Monitor user activity, login patterns, and account information
          </Text>
        </Box>

        <Flex alignItems="center" gap={4}>
          <Box textAlign="right">
            <Flex alignItems="center" gap={2} marginBottom={1}>
              <FaUser size="14" color="#666" />
              <Text fontSize="sm" color="gray.600">
                Total Users: {rows.length}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <FaClock size="14" color="#666" />
              <Text fontSize="xs" color="gray.500">
                Last updated: {dayjs().format('DD/MM/YYYY h:mm A')}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      {isLoading && rows.length === 0 ? (
        <Flex
          height="400px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Spinner size="xl" color="primary.base" />
          <Text marginTop={4} color="gray.600">
            Loading audit data...
          </Text>
        </Flex>
      ) : error ? (
        <EmptyState
          cta={<Button onClick={fetchRowItems}>Try Again</Button>}
          heading="Failed to load audit data"
          description={error}
        />
      ) : (
        <Table
          {...tableProps}
          placeholder="Search by name, username, or email"
          rows={rows}
          setRows={setRows}
          handleFetch={fetchRowItems}
          isLoading={isLoading}
        />
      )}
    </AdminMainAreaWrapper>
  );
};

export const ViewAuditRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ViewAudit {...props} />} />;
};

export default ViewAuditRoute;
