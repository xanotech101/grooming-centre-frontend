import { http } from "../http";
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

  return {
    courses: data,
  };
};

/**
 * Endpoint for course editing/modification
 * @param {string} courseId
 * @param {object} body
 * @returns {Promise<{ message: string, course: { id: string }}>}
 */
export const adminEditCourse = async (courseId, body) => {
  const path = `/course/edit/${courseId}`;

  const {
    data: { message, data },
  } = await http.patch(path, body);

  const course = {
    id: data[0].id,
  };

  return { message, course };
};

/**
 * Endpoint for course creation
 * @param {{ title: string, thumbnail: File, certificate: File, description: string, departmentId: string, }} body
 * @returns {Promise<{ message: string, course: { id: string } }>}
 */
export const adminCreateCourse = async (body) => {
  const path = "/course/create";

  const {
    data: { message, data },
  } = await http.post(path, body);

  const course = { id: data.id };

  return { message, course };
};

/**
 * Endpoint to get user `course-listing`
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
      assessments: data.assessment, // TODO: remove lazy mapping
    }, // TODO: remove lazy mapping
  };
};
