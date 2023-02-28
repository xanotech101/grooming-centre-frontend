import { Route } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Heading,
  Table,
  Text,
  Breadcrumb,
  Link,
} from "../../../components";
import { BreadcrumbItem } from "@chakra-ui/react";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { AdminMainAreaWrapper } from "../../../layouts/admin/MainArea/Wrapper";
import {
  adminDeleteMultipleCourses,
  adminGetStandaloneExaminationListing,
} from "../../../services";
import { getDuration } from "../../../utils";
import dayjs from "dayjs";
import { useTableRows } from "../../../hooks";

const tableProps = {
  filterControls: [
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
      id: "2",
      key: "title",
      text: "Examination Title",
      fraction: "2fr",
      renderContent: (data) => (
        <Link
          href={`/admin/standalone-exams/${data.examinationId}/${data.text}`}
        >
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    {
      id: "3",
      key: "noOfUsers",
      text: "No. of Candidates",
      fraction: "200px",
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
          `/admin/courses/not-set/assessment/not-set/overview?examination=${examination.id}&examinationName=${examination.title.text}`,
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
    pagination: true,
  },
};

const StandaloneExaminationListingPage = () => {
  const mapExaminationToRow = (examination) => ({
    id: examination.id,
    // courseId,
    title: {
      text: examination.title,
      examinationId: examination.id,
      // courseId,
    },
    startDate: dayjs(examination.startTime).format("DD/MM/YYYY h:mm a"),
    duration: getDuration(examination.duration).combinedText,
    noOfUsers: examination.noOfUsers,
  });

  const fetcher = () => async () => {
    const { examinations, showingDocumentsCount, totalDocumentsCount } =
      await adminGetStandaloneExaminationListing();

    const rows = examinations.map(mapExaminationToRow);

    return { rows, showingDocumentsCount, totalDocumentsCount };
  };

  const { rows, setRows, fetchRowItems } = useTableRows(fetcher);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="/admin/s">Examination</Link>
          </BreadcrumbItem>
        }
        item3={
          <BreadcrumbItem isCurrentPage>
            <Link href="/admin/standalone-exams/:examinationId/:examinationName">
              All Participants
            </Link>
          </BreadcrumbItem>
        }
      />

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "flex-start", lg: "center" }}
        borderBottom="1px"
        borderColor="accent.2"
        paddingBottom={5}
        gap={5}
        marginBottom={5}
      >
        <Heading as="h1" fontSize="heading.h3">
          Standalone Examinations
        </Heading>

        <Button
          link={`/admin/courses/not-set/assessment/not-set/overview?examination=new`}
        >
          Add Examination
        </Button>
      </Box>

      <Table
        {...tableProps}
        placeholder="Title"
        rows={rows}
        setRows={setRows}
        handleFetch={fetchRowItems}
      />
    </AdminMainAreaWrapper>
  );
};

export const StandaloneExaminationListingPageRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => <StandaloneExaminationListingPage {...props} />}
    />
  );
};

export default StandaloneExaminationListingPageRoute;
