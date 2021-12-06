import { http } from "../http";

/**
 * Endpoint to get user event listing
 *
 * @returns {Promise<{ events: Array<{ id: string, description: string, name: string, startTime: Date, endTime: Date, departmentId: string }> }>}
 */
export const userGetEventListing = async () => {
  const path = `/events`;

  const {
    data: { data },
  } = await http.get(path);

  const events = data.map((event) => ({
    id: event.id,
    startTime: event.startTime,
    endTime: event.endTime,
    name: event.name,
    description: event.description,
    departmentId: event.departmentId,
  }));

  return { events };
};

/**
 * Endpoint to user to join an event
 * @param {string} eventId
 *
 * @returns {Promise<{ event: { id: string, link: string } }> }>}
 */
export const userJoinEvent = async (eventId) => {
  const path = `/events/join/${eventId}`;

  const {
    data: { data },
  } = await http.get(path);

  const event = {
    id: data.id,
    link: data.link,
  };

  return { event };
};

/**
 * Endpoint for admin to get event listing
 *
 * @returns {Promise<{ events: Array<{ id: string, description: string, name: string, startTime: Date, endTime: Date, departmentId: string }> }>}
 */
export const adminGetEventListing = async () => {
  const path = `/admin/events`;

  const {
    data: { data },
  } = await http.get(path);

  const events = data.map((event) => ({
    id: event.id,
    startTime: event.startTime,
    endTime: event.endTime,
    name: event.name,
    description: event.description,
    departmentId: event.departmentId,
    file: event.thumbnail,
  }));

  return { events };
};

/**
 * Endpoint for admin to create a event
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
export const adminCreateEvent = async (body) => {
  const path = `/events/create`;

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for admin to modify a event
 * @param {string} eventId
 * @param {object} body
 *
 * @returns {Promise<{ message: string }>}
 */
export const adminEditEvent = async (eventId, body) => {
  const path = `/events/edit/${eventId}`;

  const {
    data: { message },
  } = await http.patch(path, body);

  return { message };
};
