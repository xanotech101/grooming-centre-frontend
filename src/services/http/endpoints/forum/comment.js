import { getFullName } from "../../../../utils";
import { http } from "../../http";

const getExpressionCount = (expText, expressions) =>
  expressions.reduce(
    (prev, exp) => (exp.expression === expText ? (prev += 1) : prev),
    0
  );

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
    body: comment.comment,
    commentId: comment.commentId,
    replyCount: comment.replies.length,
    likes: getExpressionCount("like", comment.expressions),
    dislikes: getExpressionCount("dislike", comment.expressions),
    expressions: comment.expressions,
    active: comment.active,
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.comment,
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
    body: comment.comment,
    replyCount: comment.replies.length,
    likes: getExpressionCount("like", comment.expressions),
    dislikes: getExpressionCount("dislike", comment.expressions),
    expressions: comment.expressions,
    user: {
      id: comment.user.id,
      profilePics: comment.user.profilePics,
      fullName: getFullName(comment.user),
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.comment,
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
    body: comment.comment,
    replyCount: comment.replies.length,
    likes: getExpressionCount("like", comment.expressions),
    dislikes: getExpressionCount("dislike", comment.expressions),
    expressions: comment.expressions,
    active: comment.active,
    user: {
      id: comment.user.id,
      profilePics: comment.user.profilePics,
      fullName: getFullName(comment.user),
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.comment,
      active: reply.active,
      user: {
        id: reply.user.id,
        fullName: getFullName(reply.user),
      },
    })),
  }));

  return { comments };
};

/**
 * Endpoint to edit forum comment
 * @param {string} commentId
 * @param {object} body
 *
 * @returns {
 *   Promise<{
 *     comment: { body: object, message: string }
 *   }>
 * }
 */
export const userForumEditComment = async (commentId, body) => {
  const path = `/forum/comment/${commentId}`;

  const {
    data: { message, data },
  } = await http.patch(path, { comment: body.comment });

  const comment = {
    id: data.id,
    body: data.comment,
    active: data.active,
    questionId: data.questionId,
    createdAt: data.createdAt,
    likes: getExpressionCount("like", data.expressions),
    dislikes: getExpressionCount("dislike", data.expressions),
    expressions: data.expressions,
    replyCount: data.replies.length,
    replies: data.replies.map((reply) => ({
      id: reply.id,
      body: reply.comment,
      active: reply.active,
      user: {
        id: reply.user.id,
        fullName: getFullName(reply.user),
      },
    })),
  };

  return { message, data: comment };
};

/**
 * Endpoint to delete forum comment
 * @param {string} commentId
 *
 * @returns {
 *   Promise<void>
 * }
 */
export const userForumDeleteComment = async (commentId) => {
  const path = `/forum/comment/${commentId}`;

  await http.delete(path);
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
    active: data.active,
    questionId: data.questionId,
    createdAt: data.createdAt,
    likes: getExpressionCount("like", data.expressions),
    dislikes: getExpressionCount("dislike", data.expressions),
    expressions: data.expressions,
  };

  return { message, data: comment };
};

/**
 * Endpoint to add a forum comment
 * @param {{ expression: string, commentId: string }} body
 *
 * @returns {Promise<{ message: string } }>}
 */
export const userForumCreateExpression = async (body) => {
  const path = `/forum/comment/commentExpression`;

  await http.post(path, body);
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
    active: data.active,
  };

  return { message, data: reply };
};
