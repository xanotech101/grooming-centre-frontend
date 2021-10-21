import { http } from "../../http";

/**
 * Endpoint to get forum tags
 *
 * @returns {Promise<{ tags: Array<{ value: string, label: string }> }>}
 */
export const userForumGetTags = async () => {
  const path = `/forum/tag`; // TODO: pass in filter values

  const {
    data: { data },
  } = await http.get(path);

  const tags = data.map((tag) => ({
    id: tag.id,
    label: tag.title,
  }));

  return { tags };
};

/**
 * Endpoint to create forum tag
 * @param {{ title: string }} body
 *
 * @returns {Promise<{ tag: { value: string, label: string }}>}
 */
export const userForumCreateTag = async (body) => {
  const path = `/forum/tag/create`;

  const {
    data: { data },
  } = await http.post(path, body);

  const tag = {
    id: data.id,
    label: data.title,
  };

  return { tag };
};
