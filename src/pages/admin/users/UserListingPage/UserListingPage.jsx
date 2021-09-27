import { Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { Button, Heading, Table } from "../../../../components";
import { AdminMainAreaWrapper } from "../../../../layouts/admin/MainArea/Wrapper";

const UserListingPage = () => {
  const filterControls = [
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
      body: {
        radios: [
          { label: "Alphabetically: ascending" },
          { label: "Alphabetically: descending" },
          { label: "Date: ascending" },
          { label: "Date: descending" },
        ],
      },
    },
  ];

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

      <Table filterControls={filterControls} />
    </AdminMainAreaWrapper>
  );
};

export const UserListingPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserListingPage {...props} />} />;
};

export default UserListingPage;
