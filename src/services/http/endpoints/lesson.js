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
