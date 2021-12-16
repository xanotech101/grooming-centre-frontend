import { http } from "../http";

/**
 * Endpoint to get all appointments for a day
 * @param {string} date - date to get appointments for day
 *
 * @returns {Promise<{ appointments: Array<{ id: string, title: string, startTime: string, endTime: string }>>}
 */
export const userGetDayAppointments = async (date) => {
  const path = `/appointments/day`;

  const {
    data: { data },
  } = await http.get(path, { params: { date } });

  const appointments = [
    ...data.events.map((event) => ({
      id: event.id,
      startTime: event.startTime,
      endTime: event.endTime,
      title: event.title,
    })),
    ...data.lessons.map((lesson) => ({
      id: lesson.id,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
      title: lesson.title,
    })),
  ];

  return { appointments };
};
