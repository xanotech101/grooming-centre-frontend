import { endedDates, ongoingDates, upcomingDates } from "../course/responses";

export const loggedInUserGetEventListingRes = {
  data: [
    {
      ...endedDates,
      id: "eventId_1",
      name: "Video Conference",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?
      `,
      departmentId: "departmentId_1",
    },
    {
      ...ongoingDates,
      id: "eventId_2",
      name: "Live Stream",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?`,
      departmentId: "departmentId_2",
    },
    {
      ...upcomingDates,
      id: "eventId_3",
      name: "Mock Event",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
      departmentId: "departmentId_2",
    },
  ],
};

export const adminGetEventDetailRes_eventId_1 = {
  data: {
    id: "eventId_1",
    startTime: new Date(Date.now() + 60 * 1 * 1000).toISOString(),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    name: "Video Conference",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?
      `,
    speaker: "",
  },
};

export const adminCreateEventRes = {
  message: "event created successfully",
};
