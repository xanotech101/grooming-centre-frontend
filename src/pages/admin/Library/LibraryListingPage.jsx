import { BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { Flex } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { Route } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Heading,
  Link,
  Table,
  Text,
} from "../../../components";
import { AdminMainAreaWrapper } from "../../../layouts";
import {
  adminDeleteCourse,
  adminDeleteMultipleCourses,
  adminLibraryListing,
} from "../../../services";

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
      key: "title",
      text: "Title",
      renderContent: (data) => (
        <Link href={`/admin/library/details/${data.libraryId}`}>
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    { id: "2", key: "department", text: "Department" },
    {
      id: "3",
      key: "type",
      text: "Type",
    },
    {
      id: "4",
      key: "instructor",
      text: "Uploaded By",
      fraction: "200px",
    },
  ],

  options: {
    action: [
      {
        text: "View",
        link: (library) => `/admin/library/details/${library.id}`,
      },
      {
        text: "Edit",
        link: (library) => `/admin/library/edit/${library.id}`,
      },
      {
        isDelete: true,
        deleteFetcher: async (library) => {
          await adminDeleteCourse(library.id);
        },
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedLibrary) => {
      console.log(selectedLibrary);
      await adminDeleteMultipleCourses();
    },
  },
};

const useLibraryListing = () => {
  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchLibrary = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { library } = await adminLibraryListing();

        const data = mapper ? library.map(mapper) : library;
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
    fetchLibrary,
  };
};

const LibraryListingPage = () => {
  const { rows, setRows, fetchLibrary } = useLibraryListing();

  useEffect(() => {
    const mapLibraryToRow = (library) => ({
      id: library.id,

      title: {
        text: library.title,
        libraryId: library.id,
      },
      department: library.department.name,
      type: library.libraryType.name,
      instructor: `${library.instructor.firstName} ${library.instructor.lastName}`,
    });

    fetchLibrary(mapLibraryToRow);
  }, [fetchLibrary]);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Library</Link>
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
          Library
        </Heading>

        <Button link="/admin/library/edit/new">Add File</Button>
      </Flex>
      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const LibraryListingPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <LibraryListingPage {...props} />} />
  );
};
