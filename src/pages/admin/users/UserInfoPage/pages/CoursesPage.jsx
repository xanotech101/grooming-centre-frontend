import { BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { Box } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useCallback, useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { Breadcrumb, Link, Table, Text } from "../../../../../components";
import { useComponentIsMount } from "../../../../../hooks";
import { AdminMainAreaWrapper } from "../../../../../layouts/admin/MainArea/Wrapper";
import { userGetCourseListing } from "../../../../../services";

const tableProps = {
  filterControls: [
    {
      triggerText: "All Courses",
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
    {
      triggerText: "Completed",
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
    {
      triggerText: "Ongoing",
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
      key: "id",
      text: "Course ID",
      fraction: "120px",
    },
    {
      id: "title",
      key: "title",
      text: "Course Title",
      fraction: "5fr",
    },
    {
      id: "4",
      key: "instructor",
      text: "Instructor",
      fraction: "200px",
    },
    {
      id: "5",
      key: "status",
      text: "Status",
      fraction: "100px",
      renderContent: (status) => (
        <Box>
          <Tag
            borderRadius="full"
            size="sm"
            backgroundColor={status < 100 ? "others.7" : "accent.4"}
            color={status < 100 ? "others.8" : "accent.5"}
          >
            <Text bold>{status < 100 ? "Ongoing" : "Completed"}</Text>
          </Tag>
        </Box>
      ),
    },
  ],
};

const useCourseListing = () => {
  const componentIsMount = useComponentIsMount();
  const {id: userId} = useParams();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchCourses = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { courses } = await userGetCourseListing(userId);

        const data = mapper ? courses.map(mapper) : courses;

        if (componentIsMount) setRows({ data });
      } catch (err) {
        console.error(err);
        if (componentIsMount) setRows({ err: true });
      } finally {
        if (componentIsMount) setRows((prev) => ({ ...prev, loading: false }));
      }
    },
    [setRows, componentIsMount, userId]
  );

  return {
    rows,
    setRows,
    fetchCourses,
  };
};

const CoursesPage = () => {
  const { rows, setRows, fetchCourses } = useCourseListing();

  useEffect(() => {
    const mapCourseToRow = (course) => ({
      id: course.id,
      title: course.title,
      instructor: course.instructor.name,
      status: course.status,
    });

    fetchCourses(mapCourseToRow);
  }, [fetchCourses]);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="/admin/users">Users</Link>
          </BreadcrumbItem>
        }
        item3={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Courses</Link>
          </BreadcrumbItem>
        }
      />
      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

const CoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CoursesPage {...props} />} />;
};

export default CoursesPageRoute;
