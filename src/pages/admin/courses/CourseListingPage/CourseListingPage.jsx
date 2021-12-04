import { Box, Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import {
  Button,
  Heading,
  Table,
  Text,
  Breadcrumb,
  Link,
} from "../../../../components";
import { AdminMainAreaWrapper } from "../../../../layouts/admin/MainArea/Wrapper";
import {
  adminDeleteMultipleCourses,
  adminGetCourseListing,
} from "../../../../services";
import { Tag } from "@chakra-ui/tag";
import { BreadcrumbItem } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useTableRows } from "../../../../hooks";

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
      text: "Course Title",
      fraction: "3fr",
      renderContent: (data) => (
        <Link href={`/admin/courses/details/${data.courseId}/info`}>
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    {
      id: "3",
      key: "instructor",
      text: "Instructor",
      fraction: "100px",
    },
    {
      id: "4",
      key: "startDate",
      text: "Start Date",
      fraction: "200px",
    },
    {
      id: "5",
      key: "status",
      text: "Status",
      fraction: "130px",
      renderContent: (status) => (
        <Box>
          <Tag
            borderRadius="full"
            size="sm"
            backgroundColor={status ? "accent.4" : "accent.1"}
            color={status ? "accent.5" : "accent.3"}
          >
            <Text bold>{status ? "Published" : "UnPublished"}</Text>
          </Tag>
        </Box>
      ),
    },
  ],

  options: {
    action: [
      {
        text: "View",
        link: (course) => `/admin/courses/details/${course.id}/info`,
      },
      {
        text: "Edit",
        link: (course) => `/admin/courses/edit/${course.id}`,
      },
      {
        isDelete: true,
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedCourses) => {
      console.log(selectedCourses);
      await adminDeleteMultipleCourses();
    },
    pagination: true,
  },
};

const CourseListingPage = () => {
  const mapCourseToRow = (course) => ({
    id: course.id,
    title: { text: course.title, courseId: course.id },
    startDate:
      course.startDate === "not set"
        ? course.startDate
        : dayjs(course.startDate).format("DD/MM/YYYY h:mm a"),
    status: course.isPublished,
    instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
  });

  const fetcher = (props) => async () => {
    const { courses, showingDocumentsCount, totalDocumentsCount } =
      await adminGetCourseListing(props?.params);

    const rows = courses.map(mapCourseToRow);

    return { rows, showingDocumentsCount, totalDocumentsCount };
  };

  const { rows, setRows, fetchRowItems } = useTableRows(fetcher);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Courses</Link>
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
          Courses
        </Heading>

        <Button link="/admin/courses/edit/new">Add Course</Button>
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

export const CourseListingPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CourseListingPage {...props} />} />
  );
};

export default CourseListingPage;
