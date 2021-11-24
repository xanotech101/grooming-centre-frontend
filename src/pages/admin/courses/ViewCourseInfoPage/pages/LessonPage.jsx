import { Route, useParams } from "react-router-dom";
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
import {
  adminDeleteCourse,
  adminDeleteMultipleCourses,
  adminGetLessonListing,
} from "../../../../../services";
import { Tag } from "@chakra-ui/tag";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import dayjs from "dayjs";

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
      id: "title",
      key: "title",
      text: "Lesson Title",
      fraction: "5fr",
      renderContent: (data) => (
        <Link
          href={`/admin/courses/${data.courseId}/lesson/${data.lessonId}/view`}
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
    action: [
      {
        text: "View",
        link: (lesson) =>
          `/admin/courses/${lesson.courseId}/lesson/${lesson.id}/view`,
      },
      {
        text: "Edit",
        link: (lesson) =>
          `/admin/courses/${lesson.courseId}/lessons/edit/${lesson.id}`,
      },
      {
        isDelete: true,
        deleteFetcher: async (lesson) => {
          await adminDeleteCourse(lesson.id);
        },
      },
    ],
    selection: true,
    multipleDeleteFetcher: async (selectedLessons) => {
      console.log(selectedLessons);
      await adminDeleteMultipleCourses();
    },
  },
};

const useLessonListing = () => {
  const { id: courseId } = useParams();
  const componentIsMount = useComponentIsMount();

  const [rows, setRows] = useState({
    data: null,
    loading: false,
    err: false,
  });

  const fetchLessons = useCallback(
    async (mapper) => {
      setRows({ loading: true });

      try {
        const { lessons } = await adminGetLessonListing(courseId);

        const data = mapper ? lessons.map(mapper) : lessons;

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
    fetchLessons,
  };
};

const LessonPage = () => {
  const { id: courseId } = useParams();
  const { rows, setRows, fetchLessons } = useLessonListing();

  useEffect(() => {
    const mapCourseToRow = (lesson) => ({
      id: lesson.id,
      courseId: lesson.courseId,
      title: {
        text: lesson.title,
        lessonId: lesson.id,
        courseId: lesson.courseId,
      },
      startDate: dayjs(lesson.startTime).format("DD/MM/YYYY h:mm a"),
      status: lesson.active,
    });

    fetchLessons(mapCourseToRow);
  }, [fetchLessons]);

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
            <Link href="#">Lessons</Link>
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
          Lessons
        </Heading>

        <Button link={`/admin/courses/${courseId}/lessons/edit/new`}>
          Add Lesson
        </Button>
      </Flex>

      <Table {...tableProps} rows={rows} setRows={setRows} />
    </AdminMainAreaWrapper>
  );
};

export const LessonPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <LessonPage {...props} />} />;
};

export default LessonPageRoute;
