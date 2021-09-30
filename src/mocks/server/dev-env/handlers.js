import auth from "./auth/endpoints";
import course from "./course/endpoints";
import user from "./user/endpoints";

const handlers = [
  auth.adminInviteUser,
  auth.superAdminInviteAdmin,
  course.getCourseListing,
  user.getUserListing,
];

export default handlers;
