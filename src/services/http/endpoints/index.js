import { http } from "../..";

//----------- User Endpoints
/**
 * Endpoint to get `user-listing`
 *
 * @returns {Promise<{ data: UserListArray }>}
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
 * @returns {Promise<{ message: string, data: Course }>}
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
 * @returns {Promise<{ message: string, data: Course }>}
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
 * @returns {Promise<{ courses: CourseListArray }>}
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
 * @returns {Promise<{ courses: CourseListArray }>}
 */
export const userGetCourseListing = async () => {
  const path = `/course/user/courses`;

  const {
    data: { data },
  } = await http.get(path);

  return { courses: data };
};

/**
 * Endpoint to get `course-details` for a user
 * @param {string} id - courseId
 *
 * @returns {Promise<{ course: Course }>}
 */
export const userGetCourseDetails = async (id) => {
  const path = `/course/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    course: {
      // TODO: remove lazy mapping
      ...data, // TODO: remove lazy mapping
      lessons: data.lesson, // TODO: remove lazy mapping
    }, // TODO: remove lazy mapping
  };
};
//----------- END OF Course Endpoints
//

//
//----------- Department Endpoints
/**
 * Endpoint for department creation
 * @param {{name: string, active: boolean}} body
 * @returns {Promise<{ message: string, data: Department }>}
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
 * @returns {Promise<{ message: string }>}
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
 * @returns {Promise<{ message: string }>}
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
 * @returns {Promise<{ data: Object }>}
 */
export const requestMetadata = async () => {
  const path = "/metadata";

  const {
    data: { data },
  } = await http.get(path);

  return { data };
};
//--------- END OF Uncategorised Endpoints
