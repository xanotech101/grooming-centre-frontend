import { Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { Button, Heading, Table } from "../../../../components";
import { AdminMainAreaWrapper } from "../../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useEffect, useState } from "react";

const tableProps = {
  filterControls: [
    {
      triggerText: "%Grade point",
      width: "125%",
      body: {
        checks: [
          { label: "1 to 30" },
          { label: "31 to 50" },
          { label: "51 to 70" },
          { label: "71 to 100" },
        ],
      },
    },
    {
      triggerText: "Department",
      width: "125%",
      body: {
        checks: [
          { label: "Finance" },
          { label: "Engineering" },
          { label: "Accounting" },
        ],
      },
    },
    {
      triggerText: "Role",
      width: "170%",
      body: {
        checks: [
          { label: "super admin" },
          { label: "admin" },
          { label: "user" },
        ],
      },
    },
    {
      triggerText: "Sort",
      triggerIcon: <FaSortAmountUpAlt />,
      width: "200px",
      position: "right-bottom",
      noFilterTags: true,
      body: {
        radios: [
          { label: "Alphabetically: ascending" },
          { label: "Alphabetically: descending" },
          { label: "Date: ascending" },
          { label: "Date: descending" },
        ],
      },
    },
  ],

  columns: [
    {
      id: "1",
      text: "Full name",
      minWidth: "200px",
    },
    { id: "2", text: "Department" },
    {
      id: "3",
      text: "Email Address",
      minWidth: "200px",
    },
    { id: "4", text: "% Grade point" },
    { id: "5", text: "Certificates" },
  ],

  options: {
    action: true,
    selection: true,
  },

  // templateColumns: "1fr 1fr 1fr 1fr 1fr",
  columnGap: 2,
};

const getUsers = async () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        const users = [
          {
            firstName: "first 1",
            lastName: "last 1",
            department: "department 1",
            email: "email 1",
            gradePoint: "gradePoint 1",
            certificate: "certificate 1",
          },
          {
            firstName: "first 2",
            lastName: "last 2",
            department: "department 2",
            email: "email 2",
            gradePoint: "gradePoint 2",
            certificate: "certificate 2",
          },
        ];

        res(users);
      } else {
        rej("Error!");
      }
    }, 1500);
  });

const useUserListing = () => {
  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchUsers = useCallback(async () => {
    setRows({ loading: true });

    try {
      const users = await getUsers();

      setRows({ data: users });
    } catch (err) {
      setRows({ err: true });
    } finally {
      setRows((prev) => ({ ...prev, loading: false }));
    }
  }, [setRows, getUsers]);

  return {
    rows,
    fetchUsers,
  };
};

const UserListingPage = () => {
  const { rows, fetchUsers } = useUserListing();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <AdminMainAreaWrapper>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px"
        borderColor="accent.2"
        paddingBottom={5}
        marginBottom={5}
      >
        <Heading as="h1" fontSize="heading.h3">
          Manage Users
        </Heading>

        <Button>Add User</Button>
      </Flex>

      <Table {...tableProps} rowsData={rows} />
    </AdminMainAreaWrapper>
  );
};

export const UserListingPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserListingPage {...props} />} />;
};

export default UserListingPage;
