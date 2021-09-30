import course from "./course/endpoints";
import user from "./user/endpoints";

const handlers = [course.getCourseListing, user.getUserListing];

export default handlers;
