export const userForumPublishQuestionRes = {
  message: "question published successfully",
};

export const userForumGetCategoriesRes = {
  data: [
    {
      id: "forumCategoryId_1",
      name: "science and technology",
    },
    {
      id: "forumCategoryId_2",
      name: "business",
    },
    {
      id: "forumCategoryId_3",
      name: "look, this is just mock please",
    },
  ],
};

export const userForumGetQuestionsRes = {
  data: [
    {
      id: "questionId_1",
      title: "How to patch KDE on FreeBSD?",
      body: "Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.",
      createdAt: new Date(),
      tags: [
        { id: "forumTagId_1", name: "javascript" },
        { id: "forumTagId_2", name: "dart" },
      ],
      user: {
        id: "userId_2",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "jane",
        lastName: "bar",
      },
      commentCount: 10,
    },
    {
      id: "questionId_2",
      title: "What is a difference between Java nad JavaScript?",
      body: "Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.",
      createdAt: new Date(),
      tags: [
        { id: "forumTagId_1", name: "javascript" },
        { id: "forumTagId_2", name: "dart" },
      ],
      user: {
        id: "userId_2",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "jane",
        lastName: "bar",
      },
      commentCount: 10,
    },
  ],
};

export const userForumGetQuestionDetailsRes_questionId_1 = {
  data: {
    id: "questionId_1",
    title: "How to patch KDE on FreeBSD?",
    body: `
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      `,
    createdAt: new Date(),
    tags: [
      { id: "forumTagId_1", name: "javascript" },
      { id: "forumTagId_2", name: "dart" },
    ],
    user: {
      id: "userId_2",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "jane",
      lastName: "bar",
    },
    commentCount: 10,
  },
};

export const userForumGetQuestionDetailsRes_questionId_2 = {
  data: {
    id: "questionId_2",
    title: "What is a difference between Java nad JavaScript?",
    body: `
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.
      `,
    createdAt: new Date(),
    tags: [
      { id: "forumTagId_1", name: "javascript" },
      { id: "forumTagId_2", name: "dart" },
    ],
    user: {
      id: "userId_2",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "jane",
      lastName: "bar",
    },
    commentCount: 10,
  },
};
