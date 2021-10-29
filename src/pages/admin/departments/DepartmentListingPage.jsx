import { Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import {
  Button,
  Heading,
  Table,
  Text,
  Breadcrumb,
  Link,
} from "../../../components";
import { AdminMainAreaWrapper } from "../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useEffect, useState } from "react";
import { adminGetDepartmentListing } from "../../../services";
import useComponentIsMount from "../../../hooks/useComponentIsMount";
import { BreadcrumbItem } from "@chakra-ui/react";
import dayjs from "dayjs";

const tableProps = {
  filterControls: [
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
      id: "2",
      key: "title",
      text: "Title",
      fraction: "2fr",
      renderContent: (data) => (
        <Link href={`/admin/departments/details/${data.departmentId}/info`}>
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    {
      id: "4",
      key: "createdAt",
      text: "Created at",
      fraction: "200px",
    },
    {
      id: "5",
      key: "noOfusers",
      text: "No of Users",
      fraction: "150px",
    },
  ],

  options: {
    action: true,
    selection: true,
  },
};

const useDepartmentListing = () => {
  const componentIsMount = useComponentIsMount();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchDepartments = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { departments } = await adminGetDepartmentListing();

        const data = mapper ? departments.map(mapper) : departments;

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
    fetchDepartments,
  };
};

const DepartmentListingPage = () => {
  const { rows, setRows, fetchDepartments } = useDepartmentListing();

  useEffect(() => {
    const mapDepartmentToRow = (department) => ({
      id: department.id,
      title: { text: department.name, departmentId: department.id },
      createdAt: dayjs(department.createdAt).format("DD/MM/YYYY h:mm a"),
      noOfusers: department.noOfusers,
    });

    fetchDepartments(mapDepartmentToRow);
  }, [fetchDepartments]);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Departments</Link>
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
          Departments
        </Heading>

        <Button link={`/admin/departments/create`}>Add Department</Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const DepartmentListingPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <DepartmentListingPage {...props} />} />
  );
};

export default DepartmentListingPage;
