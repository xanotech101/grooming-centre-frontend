import { Flex } from "@chakra-ui/layout";
import { Link, Text } from "../../../../../components";
import colors from "../../../../../theme/colors";
import useCourseListing from "../../hooks/useCourseListing";

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

    const manager = useCourseListing();

  const { courses } = manager;

  return (
    <Flex
      alignItems="center"
      as="header"
      backgroundColor="white"
      height="50px"
      paddingRight={5}
      paddingLeft={10}
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
                href={link.href(courses?.[0].id)}
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
