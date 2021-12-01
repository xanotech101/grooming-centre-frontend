import { Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import {
  Button,
  Heading,
  Table,
  Breadcrumb,
  Link,
  Text,
} from "../../../../components";
import { AdminMainAreaWrapper } from "../../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useState } from "react";
import {
  adminDeleteCourse,
  adminDeleteMultipleCourses,
  adminGetUserListing,
} from "../../../../services";
import { BreadcrumbItem } from "@chakra-ui/react";

const tableProps = {
  filterControls: [
    {
      triggerText: "%Grade point",
      queryKey: "grade",
      width: "125%",
      body: {
        radios: [
          { label: "1 to 30", queryValue: "1-30" },
          { label: "31 to 50", queryValue: "31-50" },
          { label: "51 to 70", queryValue: "51-70" },
          {
            label: "71 to 100",
            queryValue: "71-100",
          },
        ],
      },
    },
    {
      triggerText: "Department",
      queryKey: "department",
      width: "125%",
      body: {
        checks: [
          { label: "Finance", queryValue: "finance" },
          { label: "Engineering", queryValue: "engineering" },
          {
            label: "Accounting",
            queryValue: "accounting",
          },
        ],
      },
    },
    {
      triggerText: "Role",
      queryKey: "role",
      width: "170%",
      body: {
        checks: [
          { label: "Super Admin", queryValue: "super admin" },
          { label: "Admin", queryValue: "admin" },
          { label: "User", queryValue: "user" },
        ],
      },
    },
    {
      triggerText: "Sort",
      queryKey: "sort",
      triggerIcon: <FaSortAmountUpAlt />,
      width: "200px",
      position: "right-bottom",
      // noFilterTags: true,
      body: {
        radios: [
          {
            label: "Alphabetically: ascending",
            queryValue: "asc",
          },
          { label: "Alphabetically: descending", queryValue: "desc" },
          {
            label: "Date: ascending",
            queryValue: "asc",
            additionalParams: { date: true },
          },
          {
            label: "Date: descending",
            queryValue: "desc",
            additionalParams: { date: true },
          },
        ],
      },
    },
  ],

  columns: [
    {
      id: "1",
      key: "fullName",
      text: "Full name",
      renderContent: (data) => (
        <Link href={`/admin/users/details/${data.userId}/profile`}>
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    { id: "2", key: "department", text: "Department" },
    {
      id: "3",
      key: "email",
      text: "Email Address",
    },
    { id: "4", key: "gradePoint", text: "% Grade point" },
    { id: "5", key: "certificates", text: "Certificates" },
  ],

  options: {
    action: [
      {
        text: "View",
        link: (user) => `/admin/users/details/${user.id}/profile`,
      },
      {
        text: "Edit",
        link: (user) => `/admin/users/edit/${user.id}`,
      },
      {
        isDelete: true,
        deleteFetcher: async (user) => {
          await adminDeleteCourse(user.id);
        },
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedUsers) => {
      console.log(selectedUsers);
      await adminDeleteMultipleCourses();
    },
    pagination: true,
  },
};

const useUserListing = () => {
  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchUsers = useCallback(
    async (props) => {
      setRows({ loading: true });

      try {
        const { users, showingDocumentsCount, totalDocumentsCount } =
          await adminGetUserListing(props?.params);

        const mapUserToRow = (user) => ({
          ...user,
          fullName: {
            text: `${user.firstName} ${user.lastName}`,
            userId: user.id,
          },
          department: user.departmentName,
          certificates: user.noOfCertificate,
        });

        const rows = users.map(mapUserToRow);
        setRows({ data: { rows, showingDocumentsCount, totalDocumentsCount } });
      } catch (err) {
        console.error(err);
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

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Users</Link>
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
        <Heading as="h1" fontSize="heading.h3">
          Manage Users
        </Heading>

        <Button link="/admin/users/edit/new">Add User</Button>
      </Flex>

      <Table
        {...tableProps}
        rows={rows}
        setRows={setRows}
        handleFetch={fetchUsers}
      />
    </AdminMainAreaWrapper>
  );
};

export const UserListingPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserListingPage {...props} />} />;
};

export default UserListingPage;
