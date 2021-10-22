import { getFullName } from "../../../../utils";
import { http } from "../../http";

/**
 * Endpoint to get the current user forum answers
 *
 * @returns {
 *   Promise<{
 *     comments: Array<Comment>
 *   }>
 * }
 */
export const userForumGetYourAnswers = async () => {
  const path = `/forum/your-answers`;

  const {
    data: { data },
  } = await http.get(path);

  const comments = data.map((comment) => ({
    id: comment.id,
    questionId: comment.questionId,
    createdAt: comment.createdAt,
    body: comment.body,
    replyCount: comment.replies.length,
    likes: comment.likes,
    dislikes: comment.dislikes,
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.body,
      user: {
        id: reply.user.id,
        fullName: getFullName(reply.user),
      },
    })),
  }));

  return { comments };
};

/**
 * Endpoint to get forum mentions
 *
 * @returns {
 *   Promise<{
 *     comments: Array<Comment>
 *   }>
 * }
 */
export const userForumGetMentions = async () => {
  const path = `/forum/mentions`;

  const {
    data: { data },
  } = await http.get(path);

  const comments = data.map((comment) => ({
    id: comment.id,
    questionId: comment.questionId,
    createdAt: comment.createdAt,
    body: comment.body,
    replyCount: comment.replies.length,
    likes: comment.likes,
    dislikes: comment.dislikes,
    user: {
      id: comment.user.id,
      profilePics: comment.user.profilePics,
      fullName: getFullName(comment.user),
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.body,
      user: {
        id: reply.user.id,
        fullName: getFullName(reply.user),
      },
    })),
  }));

  return { comments };
};

/**
 * Endpoint to get forum comments
 * @param {string} questionId
 *
 * @returns {
 *   Promise<{
 *     comments: Array<Comment>
 *   }>
 * }
 */
export const userForumGetComments = async (questionId) => {
  const path = `/forum/questions/${questionId}/comments`;

  const {
    data: { data },
  } = await http.get(path);

  const comments = data.map((comment) => ({
    id: comment.id,
    createdAt: comment.createdAt,
    body: comment.body,
    replyCount: comment.replies.length,
    likes: comment.likes,
    dislikes: comment.dislikes,
    user: {
      id: comment.user.id,
      profilePics: comment.user.profilePics,
      fullName: getFullName(comment.user),
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.body,
      user: {
        id: reply.user.id,
        fullName: getFullName(reply.user),
      },
    })),
  }));

  return { comments };
};

/**
 * Endpoint to add a forum comment
 * @param {{ comment: string, questionId: string, userId: string }} body
 *
 * @returns {Promise<{ message: string, data: { id: string, body: string, questionId: string, likes: number, dislikes: number, createdAt: Date } }>}
 */
export const userForumAddComment = async (body) => {
  const path = `/forum/comment/create`;

  const {
    data: { message, data },
  } = await http.post(path, { ...body, type: 1 });

  const comment = {
    id: data.id,
    body: data.comment,
    questionId: data.questionId,
    createdAt: data.createdAt,
    likes: data.likes,
    dislikes: data.dislikes,
  };

  return { message, data: comment };
};

/**
 * Endpoint to add a forum reply
 * @param {{ comment: string, questionId: string, userId: string, commentId: string }} body
 *
 * @returns {Promise<{ message: string, data: { id: string, body: string }}>}
 */
export const userForumAddReply = async (body) => {
  const path = `/forum/comment/create`;

  const {
    data: { message, data },
  } = await http.post(path, { ...body, type: 2 });

  const reply = {
    id: data.id,
    body: data.comment,
  };

  return { message, data: reply };
};
