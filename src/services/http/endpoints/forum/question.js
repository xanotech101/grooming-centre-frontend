import { truncateText } from "../../../../utils";
import { http } from "../../http";

/**
 * Endpoint to get forum questions result from a tag search
 *
 * @returns {
 *   Promise<{
 *     questions: Array<{ id: string, name: string, body: string, tags: Array<{ value: string, label: string }>,  user: { id: string, profilePics: string, fullName: string }, commentCount: number }>
 *   }>
 * }
 */
export const userForumGetATagSearchQuestionsResult = async (tagId) => {
  const path = `/forum/tag/${tagId}/questions`;

  const {
    data: { data },
  } = await http.get(path);

  const questions = data.rows.map((question) => ({
    id: question.id,
    title: question.title,
    body: truncateText(question.question, 100),
    createdAt: question.createdAt,
    // TODO: propose to the backend team
    tags: question.tags.map((tag) => ({
      id: tag.id,
      label: tag.name,
    })),
    user: {
      id: question.user.id,
      profilePics: question.user.profilePics,
      fullName: `${question.user.firstName} ${question.user.lastName}`,
    },
    commentCount: question.commentCount, // TODO: propose to the backend team
  }));

  return { questions };
};

/**
 * Endpoint to get the current user forum questions
 *
 * @returns {
 *   Promise<{
 *     questions: Array<{ id: string, name: string, body: string, tags: Array<{ value: string, label: string }>, commentCount: number }>
 *   }>
 * }
 */
export const userForumGetYourQuestions = async () => {
  const path = `/forum/your-questions`;

  const {
    data: { data },
  } = await http.get(path);

  const questions = data.rows.map((question) => ({
    id: question.id,
    title: question.title,
    body: truncateText(question.question, 100),
    createdAt: question.createdAt,
    // TODO: propose to the backend team
    tags: question.tags.map((tag) => ({
      id: tag.id,
      label: tag.name,
    })),
    commentCount: question.commentCount, // TODO: propose to the backend team
  }));

  return { questions };
};

/**
 * Endpoint to get forum questions
 *
 * @returns {
 *   Promise<{
 *     questions: Array<{ id: string, name: string, body: string, tags: Array<{ value: string, label: string }>, user: { id: string, profilePics: string, fullName: string }, commentCount: number }>
 *   }>
 * }
 */
export const userForumGetQuestions = async () => {
  const path = `/forum/question`;

  const {
    data: { data },
  } = await http.get(path);

  const questions = data.rows.map((question) => ({
    id: question.id,
    title: question.title,
    body: truncateText(question.question, 100),
    createdAt: question.createdAt,
    // TODO: propose to the backend team
    tags: question.tags.map((tag) => ({
      id: tag.id,
      label: tag.name,
    })),
    // TODO: propose to the backend team
    user: {
      id: question.user.id,
      profilePics: question.user.profilePics,
      fullName: `${question.user.firstName} ${question.user.lastName}`,
    },
    commentCount: question.commentCount, // TODO: propose to the backend team
  }));

  return { questions };
};

/**
 * Endpoint to get forum question details
 * @param {string} id - questionId
 *
 * @returns {
 *   Promise<{
 *     {
 *     id: string,
 *     name: string,
 *     body: string,
 *     createdAt: string,
 *     commentCount: number,
 *     tags: Array<{ value: string, label: string }>,
 *     user: { id: string, profilePics: string, fullName: string }>
 *   }>
 * }
 */
export const userForumGetQuestionDetails = async (id) => {
  const path = `/forum/questions/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const question = {
    id: data.id,
    title: data.title,
    body: data.question,
    commentCount: data.forumComments.length,
    createdAt: data.createdAt,
    tags: data.tags.map((tag) => ({
      id: tag.id,
      label: tag.title,
    })),
    user: {
      id: data.user.id,
      profilePics: data.user.profilePics,
      fullName: `${data.user.firstName} ${data.user.lastName}`,
    },
  };

  return { question };
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
 * @param {{ categoryId: string, userId: string, title: string, question: string, tagId: Array<string> }} question // TODO: signature might change
 *
 * @returns {Promise<{ message: string }>}
 */
export const userForumPublishQuestion = async (question) => {
  const path = `/forum/question/create`; // TODO: change path

  const {
    data: { message },
  } = await http.post(path, question);

  return { message };
};
