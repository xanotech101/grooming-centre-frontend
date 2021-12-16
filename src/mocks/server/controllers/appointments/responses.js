import { endedDates, ongoingDates, upcomingDates } from "../course/responses";

export const userGetDayAppointmentsRes = {
  data: {
    events: [
      {
        ...endedDates,
        id: "eventId_1",
        title: "Video Conference",
      },
      {
        ...upcomingDates,
        id: "eventId_2",
        title: "Live Stream",
      },
    ],
    lessons: [
      {
        ...ongoingDates,
        id: "eventId_1",
        title: "The Best DS and Algo section",
      },
    ],
  },
};
