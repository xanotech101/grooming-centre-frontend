import { Route } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';

import { BreadcrumbItem, Tag } from '@chakra-ui/react';
import { FaSortAmountUpAlt } from 'react-icons/fa';

import { getDuration } from '../../../utils';
import dayjs from 'dayjs';
import { useTableRows } from '../../../hooks';
import {
  Breadcrumb,
  Button,
  Heading,
  Link,
  Table,
  Text,
} from '../../../components';
import {
  adminDeleteStandaloneExaminationQuestion,
  adminGetAnnouncementListing,
  adminGetStandaloneExaminationListing,
} from '../../../services';
import { AdminMainAreaWrapper } from '../../../layouts';

const tableProps = {
  filterControls: [
    {
      triggerText: 'Sort',
      queryKey: 'sort',
      triggerIcon: <FaSortAmountUpAlt />,
      width: '200px',
      position: 'right-bottom',
      // noFilterTags: true,
      body: {
        radios: [
          {
            label: 'Alphabetically: ascending',
            queryValue: 'asc',
            additionalParams: { date: false },
          },
          {
            label: 'Alphabetically: descending',
            queryValue: 'desc',
            additionalParams: { date: false },
          },
          {
            label: 'Date: ascending',
            queryValue: 'asc',
            additionalParams: { date: true },
          },
          {
            label: 'Date: descending',
            queryValue: 'desc',
            additionalParams: { date: true },
          },
        ],
      },
    },
  ],

  columns: [
    {
      id: '2',
      key: 'announceId',
      text: 'Announcement Id',
      fraction: '2fr',
      renderContent: (data) => (
        <Link href={`/admin/announcement/edit/?announcement=${data.courseId}`}>
          <Text>{data.text}</Text>
        </Link>
      ),
    },
    {
      id: '3',
      key: 'department',
      text: 'Department Id',
      fraction: '200px',
    },
    {
      id: '4',
      key: 'author',
      text: 'Author Id',
      fraction: '200px',
    },
    {
      id: '5',
      key: 'text',
      text: 'Details',
      fraction: '150px',
    },
    {
      id: '6',
      key: 'status',
      text: 'Status',
      fraction: '150px',
      renderContent: (status) => (
        <Box>
          <Tag
            borderRadius="full"
            size="sm"
            backgroundColor={status ? 'accent.4' : 'accent.1'}
            color={status ? 'accent.5' : 'accent.3'}
          >
            <Text bold>{status ? 'Published' : 'UnPublished'}</Text>
          </Tag>
        </Box>
      ),
    },
  ],

  options: {
    action: [
      {
        text: 'Edit',
        link: (announcement) =>
          `/admin/announcement/edit/?announcement=${announcement.id}`,
      },
      {
        isDelete: true,
      },
    ],
    selection: true,
    // multipleDeleteFetcher: async (selectedExaminations) => {
    //   await adminDeleteStandaloneExaminationQuestion(
    //     selectedExaminations[0]?.id
    //   );
    // },
    pagination: true,
  },
};

const AnnouncementListing = () => {
  const mapExaminationToRow = (announcement) => ({
    announceId: {
      text: announcement.id.slice(0, 8),
      courseId: announcement.id,
    },
    id: announcement.id,
    department: announcement.departmentId.slice(0, 8),
    author: announcement.senderId.slice(0, 8),
    text: announcement.text.substring(0, 15).concat('...'),
  });

  const fetcher = (props) => async () => {
    const { announcements, showingDocumentsCount, totalDocumentsCount } =
      await adminGetAnnouncementListing(props?.params);

    const rows = announcements.map(mapExaminationToRow);

    return { rows, showingDocumentsCount, totalDocumentsCount };
  };

  const { rows, setRows, fetchRowItems } = useTableRows(fetcher);

  return (
    <AdminMainAreaWrapper>
      <Breadcrumb
        item2={
          <BreadcrumbItem isCurrentPage>
            <Link href="/admin/announcement"> Announcement</Link>
          </BreadcrumbItem>
        }
      />

      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'flex-start', lg: 'center' }}
        paddingBottom={5}
        gap={5}
        marginBottom={5}
      >
        <Heading as="h1" fontSize="heading.h3">
          Announcements
        </Heading>

        <Button link={`/admin/announcement/edit/?announcement=new`}>
          Create announcement
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

export const AnnouncementListingRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AnnouncementListing {...props} />} />
  );
};
