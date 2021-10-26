import { http } from "../http";

/**
 * Endpoint to get `lesson-details`
 * @param {string} id - lessonId
 *
 * @returns {Promise<{ lesson: Lesson }>}
 */
export const requestLessonDetails = async (id) => {
  const path = `/lesson/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  return { lesson: data };
};

/**
 * Endpoint to end a lesson
 * @param {string} id - lessonId
 *
 * @returns {Promise<{ message: string }>}
 */
export const requestEndLesson = async (id) => {
  const path = `/lesson/${id}/end`; // TODO: change path

  const {
    data: { message },
  } = await http.post(path); // TODO: change method

  return { message };
};

/**
 * Endpoint to for admin to create a lesson
 * @param {{ title: string, content: string, lessonTypeId: string, startTime: Date, endTime: Date, file: File }} body
 *
 * @returns {Promise<{ message: string, lesson: { id: string } }>}
 */
export const adminCreateLesson = async (body) => {
  const path = `/lesson/create`;

  const {
    data: { message, data },
  } = await http.post(path, body);

  const lesson = {
    id: data.id,
  };

  return { message, lesson };
};
