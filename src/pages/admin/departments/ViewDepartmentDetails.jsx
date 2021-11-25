import { Breadcrumb, Button, Heading, Link, Table } from "../../../components";
import { BreadcrumbItem, Box, Flex } from "@chakra-ui/react";
import { Route, useParams } from "react-router";
import { useApp } from "../../../contexts";
import { useCallback, useEffect, useState } from "react";
import { useComponentIsMount } from "../../../hooks";
import { adminGetDepartmentUsersListing } from "../../../services";
import { AdminMainAreaWrapper } from "../../../layouts/admin/MainArea/Wrapper";

const tableProps = {
  filterControls: [],

  columns: [
    {
      id: "2",
      key: "name",
      text: "Name",
      fraction: "1fr",
    },
    {
      id: "4",
      key: "email",
      text: "Email",
      fraction: "300px",
    },
    {
      id: "5",
      key: "roles",
      text: "Roles",
      fraction: "180px",
    },
  ],

  options: {
    action: true,
    selection: true,
  },
};

const useDepartmentUsersListing = () => {
  const componentIsMount = useComponentIsMount();
  const { departmentId } = useParams();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchCourses = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { users } = await adminGetDepartmentUsersListing(departmentId);

        const data = mapper ? users.map(mapper) : users;

        if (componentIsMount) setRows({ data });
      } catch (err) {
        console.error(err);
        if (componentIsMount) setRows({ err: true });
      } finally {
        if (componentIsMount) setRows((prev) => ({ ...prev, loading: false }));
      }
    },
    [setRows, componentIsMount, departmentId]
  );

  return {
    rows,
    setRows,
    fetchCourses,
  };
};

const ViewDepartmentPage = ({ metadata: propMetadata }) => {
  const { departmentId } = useParams();
  const { getOneMetadata } = useApp();

  const department = getOneMetadata("departments", departmentId);

  const { rows, setRows, fetchCourses } = useDepartmentUsersListing();

  useEffect(() => {
    const mapCourseToRow = (user) => ({
      id: user.id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      roles: user.userRoleName,
    });

    fetchCourses(mapCourseToRow);
  }, [fetchCourses, departmentId]);

  return (
    <AdminMainAreaWrapper>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/departments">Departments</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">{department?.name}</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <Heading fontSize="heading.h3" paddingX={6}>
        {department?.name}
      </Heading>

      <Box
        marginX={6}
        padding={10}
        marginY={10}
        border="1px"
        borderColor="accent.9"
      >
        <Flex justifyContent="space-between">
          <Heading fontSize="heading.h4">Users</Heading>
          <Button link={`/admin/users/edit/new`}>Add User</Button>
        </Flex>
        <Table width="100%" {...tableProps} rows={rows} setRows={setRows} />
      </Box>
    </AdminMainAreaWrapper>
  );
};

export const ViewDepartmentPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <ViewDepartmentPage {...props} />} />
  );
};
