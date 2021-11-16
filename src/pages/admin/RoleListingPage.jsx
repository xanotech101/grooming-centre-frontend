import { BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { Box } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Breadcrumb, Heading, Link, Table } from "../../components";
import { useComponentIsMount } from "../../hooks";
import { AdminMainAreaWrapper } from "../../layouts/admin/MainArea/Wrapper";
import { adminGetRoleListing } from "../../services";

const tableProps = {
  filterControls: [],

  columns: [
    {
      id: "2",
      key: "name",
      text: "Title",
      fraction: "1fr",
    },
    {
      id: "4",
      key: "noOfUsers",
      text: "No users",
      fraction: "150px",
    },
  ],

  options: {
    action: true,
    selection: true,
  },
};

const useRoleListing = () => {
  const componentIsMount = useComponentIsMount();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchRoles = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { roles } = await adminGetRoleListing();

        const data = mapper ? roles.map(mapper) : roles;

        if (componentIsMount) setRows({ data });
      } catch (err) {
        console.error(err);
        if (componentIsMount) setRows({ err: true });
      } finally {
        if (componentIsMount) setRows((prev) => ({ ...prev, loading: false }));
      }
    },
    [setRows, componentIsMount]
  );

  return {
    rows,
    setRows,
    fetchRoles,
  };
};

const RolesPage = ({ metadata: propMetadata }) => {
  const { rows, setRows, fetchRoles } = useRoleListing();

  useEffect(() => {
    const mapCourseToRow = (role) => ({
      id: role.id,
      name: role.name,
      noOfUsers: role.noOfUsers,
    });

    fetchRoles(mapCourseToRow);
  }, [fetchRoles]);
  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Roles</Link>
          </BreadcrumbItem>
        }
      />
      <Box
        marginX={6}
        padding={10}
        marginY={10}
        border="1px"
        borderColor="accent.9"
      >
        <Heading fontSize="heading.h4" paddingBottom={4}>Roles</Heading>

        <Table width="100%" SearchBarVisibility="none" {...tableProps} rows={rows} setRows={setRows} />
      </Box>
    </AdminMainAreaWrapper>
  );
};

export const RolesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <RolesPage {...props} />} />;
};
