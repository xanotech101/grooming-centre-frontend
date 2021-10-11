import assessment from "./assessment/endpoints";
import auth from "./auth/endpoints";
import course from "./course/endpoints";
import examination from "./examination/endpoints";
import lesson from "./lesson/endpoints";
import user from "./user/endpoints";

const commonHandlers = [
  ...auth,
  ...assessment,
  ...course,
  ...examination,
  ...lesson,
  ...user,
];

const handlers = {
  dev: [...commonHandlers],
  test: [...commonHandlers],
};

export default handlers;
