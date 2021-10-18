import { http } from "../../http";

/**
 * Endpoint to get forum questions
 *
 * @returns {
 *   Promise<{
 *     questions: Array<{ id: string, name: string, body: string, tags: Array<{ value: string, label: string }>, user: { id: string, profilePics: string, fullName: string } }>
 *   }>
 * }
 */
export const userForumGetQuestions = async () => {
  const path = `/forum/questions`;

  const {
    data: { data },
  } = await http.get(path);

  const questions = data.map((question) => ({
    id: question.id,
    title: question.title,
    body: question.body,
    createdAt: question.createdAt,
    tags: question.tags.map((tag) => ({
      id: tag.id,
      label: tag.name,
    })),
    user: {
      id: question.user.id,
      profilePics: question.user.profilePics,
      fullName: `${question.user.firstName} ${question.user.lastName}`,
    },
  }));

  return { questions };
};

/**
 * Endpoint to get forum categories
 *
 * @returns {Promise<{ categories: { value: string, label: string } }>}
 */
export const userForumGetCategories = async () => {
  const path = `/forum/categories`;

  const {
    data: { data },
  } = await http.get(path);

  const categories = data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return { categories };
};

/**
 * Endpoint to publish a forum question
 * @param {{ categoryId: string, title: string, question: string, tags: Array<{ id: string | null, tag: string }> }} question // TODO: signature might change
 *
 * @returns {Promise<{ message: string }>}
 */
export const userForumPublishQuestion = async (question) => {
  const path = `/forum/add-question`; // TODO: change path

  const {
    data: { message },
  } = await http.post(path, question);

  return { message };
};
