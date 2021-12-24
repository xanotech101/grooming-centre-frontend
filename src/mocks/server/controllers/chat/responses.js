import { requestMyDataRes } from "../auth/me_response";

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
    messages: [],
  },
};

export const userGetAUserMessagesRes_userId_2 = {
  data: {
    user: {
      id: "userId_20",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "Jonas",
      lastName: "Schemer",
    },
    messages: [
      {
        id: "msgId_1",
        title: "Yo! Xup man",
        createdAt: "2021-11-23T20:59:24.341Z",
        user: {
          id: "userId_20",
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: "Jonas",
          lastName: "Schemer",
        },
      },
      {
        id: "msgId_21",
        title: "Yo! Xup man",
        createdAt: "2021-11-23T20:59:24.341Z",
        user: {
          id: "userId_20",
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: "Jonas",
          lastName: "Schemer",
        },
      },
      {
        id: "msgId_13",
        title: "Yo! Xup man",
        createdAt: "2021-11-23T20:59:24.341Z",
        user: {
          id: "userId_20",
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: "Jonas",
          lastName: "Schemer",
        },
      },
      {
        id: "msgId_2",
        title: "I'm good man. You?",
        createdAt: "2021-11-23T21:59:24.341Z",
        user: {
          id: requestMyDataRes.data.id,
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: requestMyDataRes.data.firstName,
          lastName: requestMyDataRes.data.lastName,
        },
      },
      {
        id: "msgId_3",
        title:
          "DS and Algo is making me feel really bad right here. I'm not sure if this is for me",
        createdAt: "2021-11-23T22:59:24.341Z",
        user: {
          id: "userId_20",
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: "Jonas",
          lastName: "Schemer",
        },
      },
      {
        id: "msgId_4",
        title: "What should I do now?",
        createdAt: "2021-12-23T20:59:24.341Z",
        user: {
          id: "userId_20",
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: "Jonas",
          lastName: "Schemer",
        },
      },
      {
        id: "msgId_5",
        title: "HaHa!!! I told you quit already what are you waiting for :)",
        createdAt: "2021-12-23T21:59:24.341Z",
        user: {
          id: requestMyDataRes.data.id,
          profilePics:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          firstName: requestMyDataRes.data.firstName,
          lastName: requestMyDataRes.data.lastName,
        },
      },
    ],
  },
};
