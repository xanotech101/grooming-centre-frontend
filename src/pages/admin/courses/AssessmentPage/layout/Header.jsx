import { Flex } from "@chakra-ui/layout";

import { useParams } from "react-router";
import { Link, Text } from "../../../../../components";
import colors from "../../../../../theme/colors";

const links = [
  {
    matcher: (courseId, assessmentId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/overview`,
    href: (courseId, assessmentId, isExamination) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/overview${
        isExamination ? "?examination=true" : ""
      }`,
    text: "Overview",
  },
  {
    matcher: (courseId, assessmentId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/questions`,
    href: (courseId, assessmentId, isExamination) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/questions/new${
        isExamination ? "?examination=true" : ""
      }`,
    text: "Questions",
  },
];

const Header = () => {
  const { id: courseId, assessmentId } = useParams();
  const isExamination = /examination/i.test(window.location.search);

  const isActiveLink = (LinkMatcher) =>
    window.location.pathname.includes(LinkMatcher);

  return (
    <Flex
      alignItems="center"
      as="header"
      backgroundColor="white"
      height="50px"
      justifyContent="center"
      shadow="0 2px 2px rgba(0, 0, 0, .05)"
      position="relative"
      zIndex={1}
    >
      <nav>
        <Flex as="ul" listStyleType="none">
          {links.map((link) => (
            <li key={link.text}>
              <Link
                href={link.href(courseId, assessmentId, isExamination)}
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
      </nav>
    </Flex>
  );
};

export default Header;
