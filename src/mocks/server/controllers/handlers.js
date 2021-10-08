import auth from "./auth/endpoints";
import course from "./course/endpoints";
import lesson from "./lesson/endpoints";
import user from "./user/endpoints";

const commonHandlers = [...auth, ...course, ...lesson, ...user];

const handlers = {
  dev: [...commonHandlers],
  test: [...commonHandlers],
};

export default handlers;
