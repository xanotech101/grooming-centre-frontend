import { Route, useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { BreadcrumbItem } from "@chakra-ui/react";
import {
  Button,
  Heading,
  Table,
  Breadcrumb,
  Link,
  Text,
} from "../../../../../components";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { AdminMainAreaWrapper } from "../../../../../layouts/admin/MainArea/Wrapper";
import { useCallback, useEffect, useState } from "react";
import {
  adminDeleteCourse,
  adminDeleteMultipleCourses,
  adminGetAssessmentListing,
} from "../../../../../services";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import { getDuration } from "../../../../../utils";
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
      text: "Assessment Title",
      fraction: "2fr",
      renderContent: (data) => (
        <Link
          href={`/admin/courses/${data.courseId}/assessment/${data.assessmentId}/overview`}
        >
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    {
      id: "4",
      key: "startDate",
      text: "Start Date",
      fraction: "200px",
    },
    {
      id: "5",
      key: "duration",
      text: "Duration",
      fraction: "150px",
    },
  ],

  options: {
    action: [
      {
        text: "Edit",
        link: (assessment) =>
          `/admin/courses/${assessment.courseId}/assessment/${assessment.id}/overview`,
      },
      {
        isDelete: true,
        deleteFetcher: async (assessment) => {
          await adminDeleteCourse(assessment.id);
        },
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedAssessments) => {
      console.log(selectedAssessments);
      await adminDeleteMultipleCourses();
    },
  },
};

const useAssessmentListing = () => {
  const componentIsMount = useComponentIsMount();
  const { id: courseId } = useParams();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchCourses = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { assessments } = await adminGetAssessmentListing(courseId);

        const data = mapper ? assessments.map(mapper) : assessments;

        if (componentIsMount) setRows({ data });
      } catch (err) {
        console.error(err);
        if (componentIsMount) setRows({ err: true });
      } finally {
        if (componentIsMount) setRows((prev) => ({ ...prev, loading: false }));
      }
    },
    [setRows, componentIsMount, courseId]
  );

  return {
    rows,
    setRows,
    fetchCourses,
  };
};

const AssessmentListingPage = () => {
  const { rows, setRows, fetchCourses } = useAssessmentListing();
  const { id: courseId } = useParams();

  useEffect(() => {
    const mapCourseToRow = (assessment) => ({
      id: assessment.id,
      courseId,
      title: { text: assessment.title, assessmentId: assessment.id, courseId },
      startDate: dayjs(assessment.startTime).format("DD/MM/YYYY h:mm a"),
      duration: getDuration(assessment.duration).combinedText,
    });

    fetchCourses(mapCourseToRow);
  }, [fetchCourses, courseId]);

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

        <Button link={`/admin/courses/${courseId}/assessment/new/overview`}>
          Add Assessment
        </Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const AssessmentListingPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentListingPage {...props} />} />
  );
};

export default AssessmentListingPageRoute;
