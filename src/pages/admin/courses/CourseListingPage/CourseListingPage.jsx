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
import { useCallback, useEffect, useState } from "react";
import { adminGetCourseListing } from "../../../../services";
import { Tag } from "@chakra-ui/tag";
import useComponentIsMount from "../../../../hooks/useComponentIsMount";
import { BreadcrumbItem } from "@chakra-ui/react";

const tableProps = {
  filterControls: [
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
      text: "Course Title",
      fraction: "400px",
      renderContent: (title) => (
        <Link href={`/admin/courses/details/${title.courseId}/info`}>
          <Text>{title.text}</Text>
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
    action: true,
    selection: true,
  },
};

const useCourseListing = () => {
  const componentIsMount = useComponentIsMount();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchCourses = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { courses } = await adminGetCourseListing();

        const data = mapper ? courses.map(mapper) : courses;

        if (componentIsMount) setRows({ data });
      } catch (err) {
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
    fetchCourses,
  };
};

const CourseListingPage = () => {
  const { rows, setRows, fetchCourses } = useCourseListing();

  useEffect(() => {
    const mapCourseToRow = (course) => ({
      id: course.id,
      title: { text: course.title, courseId: course.id },
      startDate: course.startDate,
      status: course.isPublished,
      instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
    });

    fetchCourses(mapCourseToRow);
  }, [fetchCourses]);

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

        <Button link="/admin/course/edit/new">Add Course</Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const CourseListingPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CourseListingPage {...props} />} />
  );
};

export default CourseListingPage;
