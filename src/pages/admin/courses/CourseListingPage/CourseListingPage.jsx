import { Badge, Flex } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { Button, Heading, Table } from "../../../../components";
import { AdminMainAreaWrapper } from "../../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useEffect, useState } from "react";

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
      fraction: "2fr",
    },
    {
      id: "3",
      key: "instructor",
      text: "Instructor",
      minWidth: "100px",
    },
    {
      id: "4",
      key: "startDate",
      text: "Start Date",
      minWidth: "100px",
    },
    {
      id: "5",
      key: "status",
      text: "Status",
      minWidth: "100px",
      renderContent: (status) => <Badge>{status}</Badge>,
    },
  ],

  options: {
    action: true,
    selection: true,
  },
};

const getCourses = async () =>
  new Promise((res) => {
    setTimeout(() => {
      const courses = [
        {
          id: "2",
          title: "title 1",
          instructor: "instructor 1",
          startDate: "startDate 1",
          status: "status 1",
        },
        {
          id: "1",
          title: "title 1",
          instructor: "instructor 1",
          startDate: "startDate 1",
          status: "status 1",
        },
        {
          id: "1dfg3jk",
          title: "title 3",
          instructor: "instructor 3",
          startDate: "startDate 3",
          status: "status 3",
        },
      ];

      res(courses);
    }, 1500);
  });

const useCourseListing = () => {
  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchCourses = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const courses = await getCourses();

        const data = mapper ? courses.map(mapper) : courses;
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
    fetchCourses,
  };
};

const CourseListingPage = () => {
  const { rows, setRows, fetchCourses } = useCourseListing();

  useEffect(() => {
    const mapCourseToRow = (course) => ({
      ...course,
      fullName: `${course.firstName} ${course.lastName}`,
    });

    fetchCourses(mapCourseToRow);
  }, [fetchCourses]);

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
          Courses
        </Heading>

        <Button link="/admin/manage/add-course">Add Course</Button>
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
