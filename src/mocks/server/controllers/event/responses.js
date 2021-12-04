import { endedDates, ongoingDates, upcomingDates } from "../course/responses";

export const userGetEventListingRes = {
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

export const adminGetEventListingRes = {
  data: [
    {
      ...endedDates,
      id: "eventId_1",
      name: "Admin Video Conference",
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
      name: "Mock Event (Admin)",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
      departmentId: "departmentId_2",
      thumbnail:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
    },
  ],
};

export const adminCreateEventRes = {
  message: "event created successfully",
};

export const adminEditEventRes = {
  message: "event updated successfully",
};

export const userJoinEventRes = {
  data: {
    id: "eventId_2",
    link: "http://localhost:3000/courses",
  },
};
