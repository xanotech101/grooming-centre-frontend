import { Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/layout";
import { BreadcrumbItem } from "@chakra-ui/react";
import {
  Button,
  Heading,
  Table,
  Text,
  Breadcrumb,
  Link,
} from "../../../../../components";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { AdminMainAreaWrapper } from "../../../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useEffect, useState } from "react";
import { adminGetCourseListing } from "../../../../../services";
import { Tag } from "@chakra-ui/tag";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import useCourseDetails from "../../../../user/Courses/CourseDetails/hooks/useCourseDetails";

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
      key: "id",
      text: "Assessment ID",
      fraction: "100px",
    },
    {
      id: "2",
      key: "title",
      text: "Assessment Title",
      fraction: "2fr",
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
      fraction: "100px",
      renderContent: (status) => (
        <Box>
          <Tag
            borderRadius="full"
            size="sm"
            backgroundColor={status ? "accent.4" : "accent.1"}
            color={status ? "accent.5" : "accent.3"}
          >
            <Text bold>{status ? "Active" : "Inactive"}</Text>
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

const AssessmentPage = () => {
  const { rows, setRows, fetchCourses } = useCourseListing();
  const { courseDetails, fetchCourseDetails } = useCourseDetails();

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const courseDetailsData = courseDetails.data;

  // const isLoading = courseDetails.loading;
  // const isError = courseDetails.err;

  useEffect(() => {
    const mapCourseToRow = (course) => ({
      id: course.id,
      title: course.title,
      startDate: course.startDate,
      status: course.isPublished,
    });

    fetchCourses(mapCourseToRow);
  }, [fetchCourses]);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="/admin/courses">Courses </Link>
          </BreadcrumbItem>
        }
        item3={
          <BreadcrumbItem isCurrentPage>
            <Link href="#">Assessments</Link>
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
          Assessments
        </Heading>

        <Button
          link={`/admin/courses/${courseDetailsData?.id}/assessment/new/overview`}
        >
          Add Assessment
        </Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const AssessmentPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AssessmentPage {...props} />} />;
};

export default AssessmentPageRoute;
