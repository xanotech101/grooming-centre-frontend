import { useEffect } from "react";
import { Route } from "react-router-dom";
import { Box, Grid, Flex } from "@chakra-ui/layout";
import { BreadcrumbItem } from "@chakra-ui/react";
import {
  Heading,
  Breadcrumb,
  SkeletonText,
  Text,
  Button,
  Link,
  Image,
  Spinner,
} from "../../../../../components";
import { OverviewBox } from "../../../users/UserInfoPage/pages/ProfilePage";
import { FiCheckSquare } from "react-icons/fi";
import { BiCertification } from "react-icons/bi";
import { ImArrowUp } from "react-icons/im";
import useCourseDetails from "../../../../user/Courses/CourseDetails/hooks/useCourseDetails";
import { FaEdit } from "react-icons/fa";

const InfoPage = () => {
  const { courseDetails, fetchCourseDetails } = useCourseDetails();

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const courseDetailsData = courseDetails.data;

  const isLoading = courseDetails.loading;
  const isError = courseDetails.err;

  console.log(courseDetailsData);

  return isLoading || isError ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Heading color="red.500">{isError}</Heading>
      ) : null}
    </Flex>
  ) : (
    <Box paddingX={4}>
      <Box paddingX={4}>
        <Breadcrumb
          item2={
            <BreadcrumbItem isCurrentPage>
              <Link href="/admin/courses">Courses </Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Info</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <Box marginTop={2} padding={4}>
        <Flex
          paddingBottom={8}
          justifyContent="space-between"
          alignContent="center"
          flexDirection="row"
        >
          <Heading fontSize="heading.h3">Course Info</Heading>
          <Button
            paddingLeft={2}
            sizes="small"
            rightIcon={<FaEdit />}
            secondary
            link={`/admin/courses/edit/${courseDetailsData?.id}`}
          >
            Edit
          </Button>
        </Flex>

        <Box backgroundColor="white" paddingX={10} paddingY={12} shadow="md">
          {isLoading ? (
            <SkeletonText width="600px" paddingBottom={8} numberOfLines={1} />
          ) : (
            <Heading
              as="h3"
              fontSize="heading.h4"
              fontWeight="700"
              color="black"
              paddingBottom={8}
            >
              {courseDetailsData?.title}
            </Heading>
          )}

          <Flex
            width="100%"
            flexDirection={{ base: "column", laptop: "row" }}
            alignItems="center"
          >
            <Box width={{ base: "100%", laptop: "60%" }}>
              <Image
                backgroundColor="accent.3"
                src={courseDetailsData?.thumbnail}
                alt="Course Header"
              />
            </Box>
            <Box
              display="flex"
              paddingX={{ base: 0, laptop: 10 }}
              width="100%"
              height="26vh"
              overflowY="auto"
            >
              <Text color="accent.3">{courseDetailsData?.content}</Text>
            </Box>
          </Flex>
        </Box>

        <Box marginTop={10}>
          <Heading paddingBottom={4} fontSize="heading.h3">
            Overview
          </Heading>
          <Grid
            templateColumns="repeat(3, minmax(150px, 1fr))"
            gridAutoRows="100px"
            gap={3}
          >
            <OverviewBox
              value={courseDetailsData?.lessons.length}
              name="Lessons"
              icon={<ImArrowUp />}
              iconBackgroundColor="accent.6"
              href={`/admin/courses/${courseDetailsData?.id}/lesson`}
              isLoading={isLoading}
            />
            <OverviewBox
              value={courseDetailsData?.assessment.length}
              name="Assessment"
              icon={<FiCheckSquare />}
              iconBackgroundColor="accent.7"
              href={`/admin/courses/${courseDetailsData?.id}/assessment`}
              isLoading={isLoading}
            />
            <OverviewBox
              value="1"
              name="Exams"
              icon={<BiCertification />}
              iconBackgroundColor="secondary.5"
              href={`/admin/courses/${courseDetailsData?.id}/exam`}
              isLoading={isLoading}
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const InfoPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <InfoPage {...props} />} />;
};

export default InfoPageRoute;
