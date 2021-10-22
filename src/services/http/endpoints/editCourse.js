import { http } from "../http";

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
  } = await http.patch(path, body);


  return { message, data: data[0] };
};
