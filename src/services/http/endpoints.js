import { http } from "..";

//----------- Auth Endpoints
/**
 * Endpoint to request for the current loggedIn user - (auth)
 *
 * @returns Promise<{ data: `User` }>
 */
export const requestMyData = async () => {
  const path = "/me";

  const {
    data: { data },
  } = await http.get(path);

  return { data };
};

/**
 * Endpoint for user to create new password - (auth)
 * @param {{ password: string }} body
 * @returns Promise<{  message: `string` }>
 */
export const userCreateNewPassword = async (body) => {
  const path = "/password/create/new";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint to request a reset password - (auth)
 * @param {{ email: string }} body
 * @returns Promise<{ message: `string` }>
 */
export const userForgetPassword = async (body) => {
  const path = "/forgot/password";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint to actually reset password - (auth)
 * @param {{ password: string }} body
 * @returns Promise<{ message: `string` }>
 */
export const userResetPassword = async (body) => {
  const path = "/password/reset";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for user signin - (auth)
 * @param {{email: string, password: string}} body
 * @returns Promise<{ user: `Object`, token: `string`, message: `string` }>
 */
export const requestSignin = async (body) => {
  const path = "/login";

  const {
    data: {
      data: { user, token },
      message,
    },
  } = await http.post(path, body);

  return { user, token, message };
};
//========= END OF Auth Endpoints
//
//
//----------- User Endpoints
/**
 * Endpoint to get `user-listing`
 *
 * @returns Promise<{ data: `UserListArray` }>
 */
export const adminGetUserListing = async () => {
  const path = `/admin/users`;

  const {
    data: { data },
  } = await http.get(path);

  return { users: data };
};
//----------- END OF User Endpoints
//
//
//----------- Course Endpoints
/**
 * Endpoint for course creation
 * @param {{ title: string, instructorId: string, description: string, departmentId: string, }} body
 * @returns Promise<{ message: `string`, data: `Course` }>
 */
export const adminCreateCourse = async (body) => {
  const path = "/course/create";

  const {
    data: { message, data },
  } = await http.post(path, body);

  return { message, data };
};

/**
 * Endpoint for course editing/modification
 * @param {string} courseId
 * @param {object} body
 * @returns Promise<{ message: `string`, data: `Course` }>
 */
export const adminEditCourse = async (courseId, body) => {
  const path = `/course/edit/${courseId}`;

  const {
    data: { message, data },
  } = await http.post(path, body);

  return { message, data: data[0] };
};

/**
 * Endpoint to get `course-listing`
 *
 * @returns Promise<{ data: `CourseListArray` }>
 */
export const adminGetCourseListing = async () => {
  const path = `/admin/courses`;

  const {
    data: { data },
  } = await http.get(path);

  return { courses: data };
};

/**
 * Endpoint to get `course-listing`
 *
 * @returns Promise<{ data: `CourseListArray` }>
 */
export const userGetCourseListing = async () => {
  const path = `/course/user/courses`;

  const {
    data: { data },
  } = await http.get(path);

  return { courses: data };
};
//----------- END OF Course Endpoints
//
//
//----------- Department Endpoints
/**
 * Endpoint for department creation
 * @param {{name: string, active: boolean}} body
 * @returns Promise<{ message: `string`, data: `Department` }>
 */
export const adminCreateDepartment = async (body) => {
  const path = "/department/create";

  const {
    data: {
      message,
      data: { department: data },
    },
  } = await http.post(path, body);

  return { message, data };
};
//----------- END OF Department Endpoints
//
//
//----------- User Creation
/**
 * Endpoint for first step to user creation
 * @param {{ email: string, roleId: string, departmentId: string }} body
 * @returns Promise<{ message: `string` }>
 */
export const adminInviteUser = async (body) => {
  const path = "/admin/invite/user";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for first step to admin creation - (super admin)
 * @param {{ email: string, roleId: string, departmentId: string }} body
 * @returns Promise<{ message: `string` }>
 */
export const superAdminInviteAdmin = async (body) => {
  const path = "/superadmin/invite/admin";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};
//------------ END OF User Creation

//========== Uncategorised Endpoints
/**
 * Endpoint to get meta data
 * @returns Promise<{ data: `Object` }>
 */
export const requestMetadata = async () => {
  const path = "/metadata";

  const {
    data: { data },
  } = await http.get(path);

  return { data };
};
//--------- END OF Uncategorised Endpoints
