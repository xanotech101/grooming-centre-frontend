export const loggedInUserGetEventListingRes = {
  data: [
    {
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
    },
    {
      id: "eventId_2",
      startTime: new Date(Date.now() - 60 * 6 * 1000).toISOString(),
      endTime: new Date(Date.now() + 60 * 2 * 1000).toISOString(),
      name: "Live Stream",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum
      velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni
      natus laudantium totam quisquam odit consectetur reprehenderit non quae
      vitae?`,
    },
    {
      id: "eventId_3",
      startTime: new Date(Date.now() - 60 * 20 * 1000).toISOString(),
      endTime: new Date(Date.now() - 60 * 1 * 1000).toISOString(),
      name: "Mock Event",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
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
