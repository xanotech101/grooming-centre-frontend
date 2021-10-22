export const userForumReplyACommentRes = {
  message: "comment replied successfully",
  data: {
    id: `${Date.now()}`,
    comment: "I love this comment",
    commentId: "commentId_1",
  },
};

export const userForumAddCommentRes = {
  message: "comment added successfully",
  data: {
    id: `${Date.now()}`,
    comment: "I love this question",
    questionId: "questionId_1",
    createdAt: "2021-10-20T05:37:27.110Z",
    likes: 0,
    dislikes: 0,
  },
};

export const userForumGetCommentsRes_questionId_1 = {
  data: [
    {
      id: "commentId_1",
      questionId: "questionId_1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.",
      createdAt: new Date(),
      likes: 2,
      dislikes: 21,
      user: {
        id: "userId_1",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "jane",
        lastName: "bar",
      },
      replies: [],
    },
    {
      id: "commentId_2",
      questionId: "questionId_1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.",
      createdAt: new Date(),
      likes: 2,
      dislikes: 21,
      user: {
        id: "userId_1",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "jane",
        lastName: "bar",
      },
      replies: [
        {
          id: "replyId_1",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.",
          user: {
            id: "userId_1",
            firstName: "jane",
            lastName: "bar",
          },
        },
        {
          id: "replyId_2",
          body: "Lorem ipsum dolor Ornare rutrum amet, a nunc mi lacinia in iaculis",
          user: {
            id: "userId_1",
            firstName: "jane",
            lastName: "bar",
          },
        },
      ],
    },
  ],
};

export const userForumGetCommentsRes_questionId_2 = {
  data: [],
};

export const userForumGetYourAnswersRes = {
  data: [
    {
      id: "commentId_1",
      questionId: "questionId_1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.",
      createdAt: new Date(),
      likes: 2,
      dislikes: 21,
      replies: [],
    },
    {
      id: "commentId_2",
      questionId: "questionId_1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.",
      createdAt: new Date(),
      likes: 2,
      dislikes: 21,
      replies: [
        {
          id: "replyId_1",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.",
          user: {
            id: "userId_1",
            firstName: "jane",
            lastName: "bar",
          },
        },
        {
          id: "replyId_2",
          body: "Lorem ipsum dolor Ornare rutrum amet, a nunc mi lacinia in iaculis",
          user: {
            id: "userId_1",
            firstName: "jane",
            lastName: "bar",
          },
        },
      ],
    },
  ],
};
