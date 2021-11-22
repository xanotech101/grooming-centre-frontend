import { Route, useParams } from "react-router-dom";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { BreadcrumbItem, Badge } from "@chakra-ui/react";
import {
  Heading,
  Breadcrumb,
  Button,
  Text,
  Link,
  SkeletonText,
} from "../../../components";
import { FaEdit } from "react-icons/fa";
import useViewLessonInfo from "./hooks/useViewLessonInfo";
import { Skeleton } from "@chakra-ui/skeleton";
import dayjs from "dayjs";

const ViewLessonInfoPage = () => {
  const manager = useViewLessonInfo();
  const { courseId } = useParams();

  const { lesson, isLoading } = manager;

  console.log(lesson, isLoading);

  const fileIsAVideo = /((\.)(mp4|mkv))$/i.test(lesson?.file);

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
              <Link href={`/admin/courses/details/${courseId}/lessons`}>
                Lessons
              </Link>
            </BreadcrumbItem>
          }
          item4={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">View</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <Box marginY={2} padding={4}>
        <Flex
          paddingBottom={6}
          justifyContent="space-between"
          alignContent="center"
          flexDirection="row"
        >
          <Heading fontSize="heading.h3">Lesson details</Heading>
          <Button
            paddingLeft={2}
            sizes="small"
            rightIcon={<FaEdit />}
            secondary
            link={`/admin/courses/${lesson?.courseId}/lessons/edit/${lesson?.id}`}
          >
            Edit
          </Button>
        </Flex>

        <Box backgroundColor="white" paddingX={10} paddingY={12} shadow="md">
          {isLoading ? (
            <SkeletonText width="400px" paddingBottom={8} numberOfLines={1} />
          ) : (
            <Heading
              as="h3"
              fontSize="heading.h4"
              fontWeight="700"
              color="black"
              paddingBottom={8}
            >
              {lesson?.title}
            </Heading>
          )}
          <Grid templateColumns="repeat(2, 1fr)" marginBottom={10}>
            <GridItem>
              {isLoading ? (
                <SkeletonText numberOfLines={2} width="100px" />
              ) : (
                <>
                  <Heading lineHeight={8} fontSize="heading.h6">
                    Start Date
                  </Heading>
                  <Text>
                    {dayjs(lesson?.startTime).format("DD/MM/YYYY h:mm a")}
                  </Text>
                </>
              )}
            </GridItem>
            <GridItem>
              {isLoading ? (
                <SkeletonText numberOfLines={2} width="100px" />
              ) : (
                <>
                  <Heading lineHeight={8} fontSize="heading.h6">
                    Status
                  </Heading>
                  <Text>
                    {lesson?.active === true ? (
                      <Badge
                        variant="subtle"
                        borderRadius={5}
                        paddingX={4}
                        paddingY="2px"
                        textTransform="none"
                        backgroundColor="others.6"
                        color="others.5"
                      >
                        Active
                      </Badge>
                    ) : null || lesson?.active === false ? (
                      <Badge variant="subtle" colorScheme="red">
                        Inactive
                      </Badge>
                    ) : null}
                  </Text>
                </>
              )}
            </GridItem>
          </Grid>
          <Box marginBottom={10}>
            {isLoading ? (
              <SkeletonText numberOfLines={2} width="100px" />
            ) : (
              <>
                <Heading lineHeight={8} fontSize="heading.h6">
                  End Date
                </Heading>
                <Text>{dayjs(lesson?.endTime).format("DD/MM/YY h:mm a")}</Text>
              </>
            )}
          </Box>
          <Box marginBottom={10}>
            {isLoading ? (
              <SkeletonText numberOfLines={14} />
            ) : (
              <>
                <Heading fontSize="heading.h6">Content</Heading>
                <Text paddingTop={4} color="accent.3">
                  {lesson?.content}
                </Text>
              </>
            )}
          </Box>
          <Box>
            {isLoading ? (
              <>
                <SkeletonText
                  numberOfLines={1}
                  paddingBottom={4}
                  width="300px"
                />
                <Skeleton height="500px" />
              </>
            ) : (
              <>
                <Heading fontSize="heading.6">Lesson File</Heading>
                <Box paddingTop={6}>
                  {fileIsAVideo ? (
                    <iframe
                      title="Lesson Video"
                      src={lesson?.file}
                      width="100%"
                      height="500px"
                    />
                  ) : (
                    <iframe
                      title="Lesson Pdf"
                      src={lesson?.file}
                      width="320px"
                      height="400px"
                    />
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const ViewLessonInfoPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <ViewLessonInfoPage {...props} />} />
  );
};
