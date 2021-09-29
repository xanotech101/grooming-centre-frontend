import { FiSettings } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";

const links = [
  {
    href: "/admin/",
    text: "dashboard",
    exact: true,
    icon: <RiDashboardLine />,
  },
  {
    href: "/admin/users",
    text: "users",
    icon: <HiUsers />,
  },
  {
    href: "/admin/courses",
    text: "courses",
    icon: <GiBookshelf />,
  },
  {
    text: "manage",
    matcher: "/admin/manage",
    icon: <FiSettings />,
    links: [
      // {
      //   href: "/admin/manage/users",
      //   text: "Manage Users",
      // },
      {
        href: "/admin/manage/add-user",
        text: "Add New Users",
      },
      {
        href: "/admin/manage/add-course",
        text: "Add New Course",
      },
      {
        href: "/admin/manage/add-lesson",
        text: "Add New Lesson",
      },
      {
        href: "/admin/manage/add-assessment",
        text: "Add New Assessment",
      },
      {
        href: "/admin/manage/library",
        text: "Manage Library",
      },
      {
        href: "/admin/manage/events",
        text: "Manage Events",
      },
      {
        href: "/admin/manage/create-quiz",
        text: "Create Quiz",
      },
      {
        href: "/admin/manage/create-polls",
        text: "Create Polls",
      },
      {
        href: "/admin/manage/add-examination",
        text: "Add Examination",
      },
    ],
  },
];

export default links;
