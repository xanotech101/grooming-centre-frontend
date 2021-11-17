import { FiSettings } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosCalendar } from "react-icons/io";
import { AiOutlineUsergroupDelete } from "react-icons/ai";

export const links = [
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
    href: "/admin/events",
    text: "events",
    icon: <IoIosCalendar />,
  },
  {
    href: "/admin/role",
    text: "roles",
    icon: <AiOutlineUsergroupDelete />,
  },
];

export const settingsLinks = [
  {
    text: "account",
    href: "/admin/settings/",
    exact: true,
    icon: <FiSettings />,
  },
  {
    href: "/admin/settings/grade-criteria",
    text: "grade criteria",
    icon: <RiDashboardLine />,
  },
  {
    href: "/admin/settings/security",
    text: "security",
    icon: <HiUsers />,
  },
];

