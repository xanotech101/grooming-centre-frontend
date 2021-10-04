import { Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { Button, Heading, Table } from "../../../../components";
import { AdminMainAreaWrapper } from "../../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useEffect, useState } from "react";
import { getUserListing } from "../../../../services";

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
      key: "fullName",
      text: "Full name",
      minWidth: "200px",
    },
    { id: "2", key: "department", text: "Department" },
    {
      id: "3",
      key: "email",
      text: "Email Address",
      minWidth: "200px",
    },
    { id: "4", key: "gradePoint", text: "% Grade point" },
    { id: "5", key: "certificates", text: "Certificates" },
  ],

  options: {
    action: true,
    selection: true,
  },
};

const useUserListing = () => {
  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchUsers = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { users } = await getUserListing();

        const data = mapper ? users.map(mapper) : users;
        setRows({ data });
      } catch (err) {
        setRows({ err: true });
      } finally {
        setRows((prev) => ({ ...prev, loading: false }));
      }
    },
    [setRows]
  );

  return {
    rows,
    setRows,
    fetchUsers,
  };
};

const UserListingPage = () => {
  const { rows, setRows, fetchUsers } = useUserListing();

  useEffect(() => {
    const mapUserToRow = (user) => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      certificates: user.certificates.length,
    });

    fetchUsers(mapUserToRow);
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

        <Button link="/admin/users/create">Add User</Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const UserListingPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserListingPage {...props} />} />;
};

export default UserListingPage;
