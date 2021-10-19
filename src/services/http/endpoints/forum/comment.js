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
    replyCount: comment.replyCount,
    likes: comment.likes,
    dislikes: comment.dislikes,
    user: {
      id: comment.user.id,
      profilePics: comment.user.profilePics,
      fullName: `${comment.user.firstName} ${comment.user.lastName}`,
    },
  }));

  return { comments };
};

/**
 * Endpoint to add a forum comment
 * @param {{ questionId: string, commentText: string }} body // TODO: signature might change
 *
 * @returns {Promise<{ message: string }>}
 */
export const userForumAddComment = async (body) => {
  const path = `/forum/questions/${body.questionId}/comments/reply`; // TODO: change path

  const {
    data: { message },
  } = await http.post(path, { commentText: body.commentText });

  return { message };
};
