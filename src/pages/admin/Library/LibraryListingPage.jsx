import { BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { Flex } from "@chakra-ui/layout";
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
import { useTableRows } from "../../../hooks";
import { AdminMainAreaWrapper } from "../../../layouts";
import {
  adminDeleteMultipleCourses,
  adminLibraryListing,
} from "../../../services";

const tableProps = {
  filterControls: [
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
      triggerText: "Sort",
      triggerIcon: <FaSortAmountUpAlt />,
      width: "200px",
      position: "right-bottom",
      // noFilterTags: true,
      body: {
        radios: [
          {
            label: "Alphabetically: ascending",
            queryValue: "asc",
            additionalParams: { date: false },
          },
          {
            label: "Alphabetically: descending",
            queryValue: "desc",
            additionalParams: { date: false },
          },
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
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedLibrary) => {
      console.log(selectedLibrary);
      await adminDeleteMultipleCourses();
    },
    pagination: true,
  },
};

const LibraryListingPage = () => {
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

  const fetcher = (props) => async () => {
    const { library, showingDocumentsCount, totalDocumentsCount } =
      await adminLibraryListing(props?.params);

    const rows = library.map(mapLibraryToRow);

    return { rows, showingDocumentsCount, totalDocumentsCount };
  };

  const { rows, setRows, fetchRowItems } = useTableRows(fetcher);

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
      <Table
        {...tableProps}
        rows={rows}
        setRows={setRows}
        handleFetch={fetchRowItems}
      />
    </AdminMainAreaWrapper>
  );
};

export const LibraryListingPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <LibraryListingPage {...props} />} />
  );
};
