import { http } from "..";

//----------- Auth Endpoints
/**
 * Endpoint to request for the current loggedIn user - (auth)
 *
 * @returns Promise<{ data: `User` }>
 */
export const getCurrentUser = async () => {
  // const url = "/me";

  // const {
  //   data: { data },
  // } = await http.get(url);

  const data = {
    active: true,
    createdAt: "2021-09-21T13:54:00.195Z",
    departmentId: null,
    email: "admin@admin.com",
    firstName: "tobby",
    id: "e25029f6-9266-4209-830f-30378caac3d1",
    isInviteActive: false,
    iv: null,
    lastName: "Joahian",
    phone: "08111001001",
    resetToken: null,
    updatedAt: "2021-09-21T13:54:00.195Z",
    userRoleId: "9d53a523-5656-44a8-a74d-b2478b457a94",
  };

  return { data };
};

/**
 * Endpoint for user to create new password - (auth)
 * @param {{ password: string }} body
 * @returns Promise<{  message: `string` }>
 */
export const userCreateNewPassword = async (body) => {
  const url = "/password/create/new";

  const {
    data: { message },
  } = await http.post(url, body);

  return { message };
};

/**
 * Endpoint to request a reset password - (auth)
 * @param {{ email: string }} body
 * @returns Promise<{ message: `string` }>
 */
export const userForgotPassword = async (body) => {
  const url = "/forgot/password";

  const {
    data: { message },
  } = await http.post(url, body);

  return { message };
};

/**
 * Endpoint for user signin - (auth)
 * @param {{email: string, password: string}} body
 * @returns Promise<{ user: `Object`, token: `string`, message: `string` }>
 */
export const userSignin = async (body) => {
  const url = "/login";

  const {
    data: {
      data: { user, token },
      message,
    },
  } = await http.post(url, body);

  return { user, token, message };
};
//========= END OF Auth Endpoints
//
//
//----------- Course Endpoints
/**
 * Endpoint for course creation
 * @param {{ title: string, instructorId: string, description: string, departmentId: string, }} body
 * @returns Promise<{ message: `string`, data: `Course` }>
 */
export const CreateCourse = async (body) => {
  const url = "/course/create";

  const {
    data: { message, data },
  } = await http.post(url, body);

  return { message, data };
};

/**
 * Endpoint for course editing/modification
 * @param {string} courseId
 * @param {object} body
 * @returns Promise<{ message: `string`, data: `Course` }>
 */
export const EditCourse = async (courseId, body) => {
  const url = `/course/edit/${courseId}`;

  const {
    data: { message, data },
  } = await http.post(url, body);

  return { message, data: data[0] };
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
export const CreateDepartment = async (body) => {
  const url = "/department/create";

  const {
    data: {
      message,
      data: { department: data },
    },
  } = await http.post(url, body);

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
  const url = "/admin/invite/user";

  const {
    data: { message },
  } = await http.post(url, body);

  return { message };
};

/**
 * Endpoint for first step to admin creation - (super admin)
 * @param {{ email: string, roleId: string, departmentId: string }} body
 * @returns Promise<{ message: `string` }>
 */
export const superAdminInviteAdmin = async (body) => {
  const url = "/superadmin/invite/admin";

  const {
    data: { message },
  } = await http.post(url, body);

  return { message };
};
//------------ END OF User Creation

//========== Uncategorised Endpoints
/**
 * Endpoint to get meta data
 * @returns Promise<{ data: `Object` }>
 */
export const getMetadata = async () => {
  const url = "/metadata";

  const {
    data: { data },
  } = await http.get(url);

  return { data };
};
//--------- END OF Uncategorised Endpoints
