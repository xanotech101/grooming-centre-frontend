import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { IoVideocam } from "react-icons/io5";
import { VscFiles } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { Link, Text } from "../../../../components";
import colors from "../../../../theme/colors";

const coursesData = {
  id: "1234567890098765421",
  title: "Web Design & Development Crash Course 2021",
  lessons: [
    {
      id: "123454321",
      disabled: false,
      title: "Why this course?",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      file: "file_url",
      lessonType: {
        id: "232",
        name: "video",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit volutpat pellentesque elit dolor ultricies purus. Scelerisque tempus, nunc, nibh enim, porttitor et. Hendrerit elementum pretium leo nibh interdum. Mattis pharetra in leo elementum sed gravida senectus. Dictum ultrices proin scelerisque convallis habitant. Ultrices a, consequat nulla arcu dui tellus adipiscing. Morbi amet pulvinar maecenas euismod a, vitae. Mauris sapien, luctus magna lobortis adipiscing risus, lectus tortor. Maecenas auctor ac et neque in amet odio. In justo proin ipsum nam congue tortor a.",
    },
    {
      id: "098765678s",
      disabled: false,
      title: "Introduction to HTML",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      file: "file_url",
      lessonType: {
        id: "232",
        name: "video",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit volutpat pellentesque elit dolor ultricies purus. Scelerisque tempus, nunc, nibh enim, porttitor et. Hendrerit elementum pretium leo nibh interdum. Mattis pharetra in leo elementum sed gravida senectus. Dictum ultrices proin scelerisque convallis habitant. Ultrices a, consequat nulla arcu dui tellus adipiscing. Morbi amet pulvinar maecenas euismod a, vitae. Mauris sapien, luctus magna lobortis adipiscing risus, lectus tortor. Maecenas auctor ac et neque in amet odio. In justo proin ipsum nam congue tortor a.",
    },
    {
      id: "536hs5272",
      disabled: true,
      title: "Resources: Consume this contents",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      file: "file_url",
      lessonType: {
        id: "232",
        name: "pdf",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit volutpat pellentesque elit dolor ultricies purus. Scelerisque tempus, nunc, nibh enim, porttitor et. Hendrerit elementum pretium leo nibh interdum. Mattis pharetra in leo elementum sed gravida senectus. Dictum ultrices proin scelerisque convallis habitant. Ultrices a, consequat nulla arcu dui tellus adipiscing. Morbi amet pulvinar maecenas euismod a, vitae. Mauris sapien, luctus magna lobortis adipiscing risus, lectus tortor.",
    },
  ],
};

const links = coursesData.lessons.reduce((accumulator, current) => {
  const link = {
    id: current.id,
    to: `/courses/take/${coursesData.id}/lessons/${current.id}`,
    text: current.title,
    disabled: current.disabled,
    type: current.lessonType.name,
  };

  console.log(accumulator);

  accumulator.push(link);

  return accumulator;
}, []);

const Sidebar = () => {
  const renderContent = (link, props) => (
    <Tooltip label={link.text} aria-label={link.text}>
      <HStack spacing={2} padding={2} {...props}>
        <Icon fontSize="text.level1">
          {link.type !== "video" ? <VscFiles /> : <IoVideocam />}
        </Icon>

        <Text isTruncated>{link.text}</Text>
      </HStack>
    </Tooltip>
  );

  return (
    <Flex
      flexDirection="column"
      as="aside"
      width="270px"
      flexShrink={0}
      paddingRight={1}
      width="250px"
    >
      <nav>
        <Box as="ul" listStyleType="none">
          {links.map((link) => (
            <li key={link.id}>
              {link.disabled ? (
                renderContent(link, { opacity: 0.5, cursor: "not-allowed" })
              ) : (
                <Link
                  navLink
                  href={link.to}
                  exact={true}
                  style={{
                    display: "block",
                  }}
                  activeStyle={{
                    background: colors.primary.base,
                    color: colors.white,
                  }}
                >
                  {renderContent(link)}
                </Link>
              )}
            </li>
          ))}
        </Box>
      </nav>
    </Flex>
  );
};

export default Sidebar;
