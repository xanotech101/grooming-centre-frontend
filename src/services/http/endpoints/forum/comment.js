import { http } from "../../http";

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
    questionId: comment.questionId,
    createdAt: comment.createdAt,
    body: comment.body,
    replyCount: comment.replies.length,
    likes: comment.likes,
    dislikes: comment.dislikes,
    user: {
      id: comment.user.id,
      profilePics: comment.user.profilePics,
      fullName: `${comment.user.firstName} ${comment.user.lastName}`,
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      body: reply.body,
      user: {
        id: reply.user.id,
        fullName: `${reply.user.firstName} ${reply.user.lastName}`,
      },
    })),
  }));

  return { comments };
};

/**
 * Endpoint to add a forum comment
 * @param {{ id: string, text: string }} body // TODO: signature might change
 *
 * @returns {Promise<{ message: string }>}
 */
export const userForumAddComment = async (body) => {
  const path = `/forum/questions/${body.id}/comments/reply`; // TODO: change path

  const {
    data: { message },
  } = await http.post(path, { commentText: body.text });

  return { message };
};

/**
 * Endpoint to add a forum reply
 * @param {{ id: string, text: string }} body // TODO: signature might change
 *
 * @returns {Promise<{ message: string }>}
 */
export const userForumAddReply = async (body) => {
  const path = `/forum/comments/${body.id}/reply`; // TODO: change path

  const {
    data: { message },
  } = await http.post(path, { replyText: body.text });

  return { message };
};
