import { Route, useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
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
import {
  adminDeleteMultipleCourses,
  adminGetExaminationListing,
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
      text: "Examination Title",
      fraction: "2fr",
      renderContent: (data) => (
        <Link
          href={`/admin/courses/${data.courseId}/assessment/${data.courseId}/overview?examination=${data.examinationId}`}
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
        link: (examination) =>
          `/admin/courses/${examination.courseId}/assessment/${examination.courseId}/overview?examination=${examination.id}`,
      },
      {
        isDelete: true,
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedExaminations) => {
      console.log(selectedExaminations);
      await adminDeleteMultipleCourses();
    },
  },
};

const useExaminationListing = () => {
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
        const { examinations } = await adminGetExaminationListing(courseId);

        const data = mapper ? examinations.map(mapper) : examinations;

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

const ExamListingPage = () => {
  const { rows, setRows, fetchCourses } = useExaminationListing();
  const { id: courseId } = useParams();

  useEffect(() => {
    const mapCourseToRow = (examination) => ({
      id: examination.id,
      courseId,
      title: {
        text: examination.title,
        examinationId: examination.id,
        courseId,
      },
      startDate: dayjs(examination.startTime).format("DD/MM/YYYY h:mm a"),
      duration: getDuration(examination.duration).combinedText,
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
            <Link href="#">Examination</Link>
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
          Examination
        </Heading>

        <Button
          link={`/admin/courses/${courseId}/assessment/new/overview?examination=true`}
        >
          Add Examination
        </Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const ExamListingPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ExamListingPage {...props} />} />;
};

export default ExamListingPageRoute;
