import assessment from "./assessment/endpoints";
import auth from "./auth/endpoints";
import course from "./course/endpoints";
import examination from "./examination/endpoints";
import lesson from "./lesson/endpoints";
import user from "./user/endpoints";
import coursesOverview from "./coursesoverview/endpoints";
import certificate from "./certificate/endpoints";

const commonHandlers = [
  ...auth,
  ...course,
  ...lesson,
  ...user,
  ...coursesOverview,
  ...certificate,
  ...examination,
  ...assessment,
]; 

const handlers = {
  dev: [...commonHandlers],
  test: [...commonHandlers],
};

export default handlers;
