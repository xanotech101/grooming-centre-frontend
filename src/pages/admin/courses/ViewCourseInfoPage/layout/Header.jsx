import { Flex } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Heading, Link, Spinner, Text } from "../../../../../components";
import colors from "../../../../../theme/colors";
import useCourseDetails from "../../../../user/Courses/CourseDetails/hooks/useCourseDetails";

const links = [
  {
    href: (courseId) => `/admin/courses/details/${courseId}/info`,
    text: "Info",
  },
  {
    href: (courseId) => `/admin/courses/details/${courseId}/lessons`,
    text: "Lessons",
  },
  {
    href: (courseId) => `/admin/courses/details/${courseId}/assessment`,
    text: "Assessment",
  },
  {
    href: (courseId) => `/admin/courses/details/${courseId}/exam`,
    text: "Exam",
  },
];

const Header = () => {
  const { courseDetails, fetchCourseDetails } = useCourseDetails();

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const courseDetailsData = courseDetails.data;

  const isLoading = courseDetails.loading;
  const isError = courseDetails.err;

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
    <Flex
      alignItems="center"
      as="header"
      backgroundColor="white"
      height="50px"
      paddingLeft={20}
      shadow="0 2px 2px rgba(0, 0, 0, .05)"
      position="relative"
      zIndex={1}
    >
      <nav>
        <Flex as="ul" listStyleType="none">
          {links.map((link) => (
            <li key={link.text}>
              <Link
                navLink
                href={link.href(courseDetailsData?.id)}
                style={{
                  color: colors.accent[2],
                  display: "block",
                }}
                activeStyle={{
                  color: colors.black,
                }}
              >
                <Text paddingX={3}>{link.text}</Text>
              </Link>
            </li>
          ))}
        </Flex>
      </nav>
    </Flex>
  );
};

export default Header;
