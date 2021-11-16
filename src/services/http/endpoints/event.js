import { http } from "../http";

/**
 * Endpoint to get user event listing
 *
 * @returns {Promise<{ events: Array<{ id: string, description: string, name: string,  startTime: Date }> }>}
 */
export const loggedInUserGetEventListing = async () => {
  const path = `/events`;

  const {
    data: { data },
  } = await http.get(path);

  const events = data.map((event) => ({
    id: event.id,
    startTime: event.startTime,
    name: event.name,
    description: event.description,
  }));

  return { events };
};
