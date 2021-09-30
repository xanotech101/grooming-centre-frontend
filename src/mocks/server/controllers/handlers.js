import auth from "./auth/endpoints";
import course from "./course/endpoints";
import user from "./user/endpoints";

const commonHandlers = [
  auth.adminInviteUser,
  auth.superAdminInviteAdmin,
  course.getCourseListing,
  user.getUserListing,
];

const handlers = {
  dev: [...commonHandlers],
  test: [...commonHandlers],
};

export default handlers;
