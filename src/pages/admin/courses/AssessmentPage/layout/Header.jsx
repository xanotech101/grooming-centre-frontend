import { Flex } from "@chakra-ui/layout";

import { useParams } from "react-router";
import { Link, Text } from "../../../../../components";
import colors from "../../../../../theme/colors";

const links = [
  {
    href: (courseId, assessmentId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/overview`,
    text: "Overview",
  },
  {
    href: (courseId, assessmentId) =>
      `/admin/courses/${courseId}/assessment/${assessmentId}/questions/new`,
    text: "Questions",
  },
];

const Header = () => {
  const { id: courseId, assessmentId } = useParams();

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
                navLink
                href={link.href(courseId, assessmentId)}
                style={{
                  color: colors.accent[2],
                  display: "block",
                }}
                activeStyle={{
                  color: colors.black,
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
