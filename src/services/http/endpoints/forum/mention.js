import { http } from "../../http";

/**
 * Endpoint to get forum usernames
 *
 * @returns {Promise<{ usernames: { is: string, name: string } }>}
 */
export const userForumGetUsernames = async (params) => {
  const path = `/forum/usernames`;

  const {
    data: { data },
  } = await http.get(path, { params });

  const usernames = data.map((username) => ({
    id: username.id,
    name: username.name,
    profilePics: username.profilePics,
  }));

  return { usernames };
};
