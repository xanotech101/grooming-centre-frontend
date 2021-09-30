import auth from "./auth/endpoints";
import course from "./course/endpoints";
import user from "./user/endpoints";

const commonHandlers = [...auth, ...course, ...user];

const handlers = {
  dev: [...commonHandlers],
  test: [...commonHandlers],
};

export default handlers;
