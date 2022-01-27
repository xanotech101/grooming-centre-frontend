import { Box, Flex } from "@chakra-ui/layout";
import { IoArrowBack } from "react-icons/io5";
import { useParams } from "react-router";
import { Button, Link, Text } from "../../../../../components";
import { useQueryParams } from "../../../../../hooks";
import colors from "../../../../../theme/colors";

const links = [
  {
    matcher: (courseId, assessmentId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/overview`,
    href: (courseId, assessmentId, examinationId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/overview${
        examinationId ? `?examination=${examinationId}` : ""
      }`,
    text: "Overview",
  },
  {
    matcher: (courseId, assessmentId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/questions`,
    href: (courseId, assessmentId, examinationId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/questions/new${
        examinationId ? `?examination=${examinationId}` : ""
      }`,
    text: "Questions",
  },
];

const Header = () => {
  const { id: courseId, assessmentId } = useParams();

  const examinationId = useQueryParams().get("examination");
  const isExamination = examinationId;
  const isStandaloneExamination =
    courseId === "not-set" && assessmentId === "not-set" && examinationId
      ? true
      : false;
  const standaloneExaminationName = useQueryParams().get("examinationName");

  const isActiveLink = (LinkMatcher) =>
    window.location.pathname.includes(LinkMatcher);

  return (
    <Flex
      alignItems="center"
      as="header"
      backgroundColor="white"
      shadow="0 2px 2px rgba(0, 0, 0, .05)"
      position="relative"
      zIndex={1}
      paddingX={12}
      paddingY={2}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/** Empty box */}
        <Box></Box>
        <Flex as="ul" listStyleType="none">
          {links.map((link) => (
            <li key={link.text}>
              <Link
                href={link.href(courseId, assessmentId, examinationId)}
                style={{
                  color: isActiveLink(link.matcher(courseId, assessmentId))
                    ? colors.black
                    : colors.accent[2],
                  display: "block",
                }}
                disabled={assessmentId === "new"}
              >
                <Text paddingX={3}>{link.text}</Text>
              </Link>
            </li>
          ))}
        </Flex>
        <Flex justifyContent="end" width="180px">
          <Button
            width="100%"
            leftIcon={<IoArrowBack />}
            link={
              isStandaloneExamination
                ? examinationId === "new"
                  ? "/admin/standalone-exams"
                  : `/admin/standalone-exams/${examinationId}/${standaloneExaminationName}`
                : isExamination
                ? `/admin/courses/details/${courseId}/exam`
                : `/admin/courses/details/${courseId}/assessment`
            }
            secondary
          >
            {isExamination ? "Examination" : "Assessment"}
          </Button>
        </Flex>
      </nav>
    </Flex>
  );
};

export default Header;
