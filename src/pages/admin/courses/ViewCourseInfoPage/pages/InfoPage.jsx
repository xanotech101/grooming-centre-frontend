import { Route } from "react-router-dom";
import { Box, Grid, Flex } from "@chakra-ui/layout";
import { BreadcrumbItem } from "@chakra-ui/react";
import {
  Heading,
  Breadcrumb, SkeletonText, Text, Button, Link, Image 
} from "../../../../../components";
import { OverviewBox } from "../../../users/UserInfoPage/pages/ProfilePage";
import { FiCheckSquare } from "react-icons/fi";
import { BiCertification } from "react-icons/bi";
import { ImArrowUp } from "react-icons/im";
import useCourseListing from "../../hooks/useCourseListing";
import { FaEdit } from "react-icons/fa";
const InfoPage = () => {

  const manager = useCourseListing();

  const { courses, isLoading } = manager;

const coursesIsLoading = !courses;




  return (
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
            link={`/admin/course/edit/${courses?.[0].id}`}
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
              {courses?.[0].title}
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
                src={courses?.[0].thumbnail}
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
              <Text>{courses?.[0].content}</Text>
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
              value={courses?.[0].lesson}
              name="Grade Point"
              icon={<ImArrowUp />}
              iconBackgroundColor="accent.6"
              href={`/admin/courses/${courses?.id}/lesson`}
              isLoading={coursesIsLoading}
            />
            <OverviewBox
              value={courses?.[0].assessment}
              name="Completed Courses"
              icon={<FiCheckSquare />}
              iconBackgroundColor="accent.7"
              href={`/admin/courses/${courses?.id}/assessment`}
              isLoading={coursesIsLoading}
            />
            <OverviewBox
              value={courses?.[0].exams}
              name="Certificates"
              icon={<BiCertification />}
              iconBackgroundColor="secondary.5"
              href={`/admin/courses/${courses?.id}/exam`}
              isLoading={coursesIsLoading}
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
