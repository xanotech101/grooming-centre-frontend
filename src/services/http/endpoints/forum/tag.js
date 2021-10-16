import { http } from "../../http";

/**
 * Endpoint to get forum tags
 *
 * @returns {Promise<{ tags: { value: string, label: string } }>}
 */
export const userForumGetTags = async () => {
  const path = `/forum/tags`; // TODO: pass in filter values

  const {
    data: { data },
  } = await http.get(path);

  const tags = data.map((tag) => ({
    id: tag.id,
    label: tag.name,
  }));

  return { tags };
};
