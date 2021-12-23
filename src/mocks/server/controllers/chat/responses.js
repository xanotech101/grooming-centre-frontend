export const userGetMessagesRes = {
  data: [
    {
      id: "msgId_1",
      lastMessage: `Yo! Xup man`,
      user: {
        id: "userId_1",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "john",
        lastName: "aVeryLongLastName",
      },
      date: "2021-11-08T15:47:54.988Z",
      unreadCount: 20,
    },
    {
      id: "msgId_2",
      lastMessage: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, urna eu consectetur congue, nisl nisl euismod ipsum, eu congue nisl nisi euismod nisl.`,
      user: {
        id: "userId_2",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "Jonas",
        lastName: "Schemer",
      },
      date: "2021-11-08T15:47:54.988Z",
      unreadCount: 0,
    },
  ],
};

export const userGetAUserMessagesRes_userId_1 = {
  data: {
    user: {
      id: "userId_1",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "john",
      lastName: "aVeryLongLastName",
    },
  },
};

export const userGetAUserMessagesRes_userId_2 = {
  data: {
    user: {
      id: "userId_2",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "Jonas",
      lastName: "Schemer",
    },
  },
};
