import { FiSettings } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosCalendar } from "react-icons/io";

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
    href: "/admin/events",
    text: "events",
    icon: <IoIosCalendar />,
  },
  {
    text: "departments",
    href: "/admin/departments",
    icon: <FiSettings />,
  },
  {
    href: "/admin/role",
    text: "roles",
    icon: <IoIosCalendar />,
  },
];

export default links;
