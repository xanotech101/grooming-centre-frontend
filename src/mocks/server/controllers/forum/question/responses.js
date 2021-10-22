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
  data: {
    count: 2,
    rows: [
      {
        id: "questionId_1",
        title: "File uploadrgo",
        question: "How to upload files to cloudinary",
        createdAt: "2021-10-19T23:37:54.484Z",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
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
        title: "File uploaders",
        question: "How to upload files to cloudinary",
        createdAt: "2021-10-20T05:16:51.057Z",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
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
  },
};

export const userForumGetQuestionDetailsRes_questionId_1 = {
  data: {
    id: "questionId_1",
    title: "File uploaders",
    question: "How to upload files to cloudinary",
    createdAt: "2021-10-20T05:16:51.057Z",
    user: {
      id: "userId_2",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "jane",
      lastName: "bar",
    },
    // TODO: propose to backend team to replace this with `commentCount`
    forumComments: [
      {
        id: "3f7ef39b-5f9a-40f0-9477-0db3909f3974",
        comment: "I love this question",
        likes: 0,
        dislikes: 0,
        active: true,
        createdAt: "2021-10-20T05:37:27.110Z",
        updatedAt: "2021-10-20T05:37:27.110Z",
        questionId: "f4b680ee-2330-4cf4-8d62-8c0296c82573",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
        user: {
          id: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
          firstName: "tobby",
          lastName: "Joahian",
          email: "admin@admin.com",
          phone: "08111001001",
          password:
            "$2b$10$vn57DyG8oMnm0ttOZxfcPe19IGuQthE5DGVpHJvjYh4sjiyqW/Vty",
          profilePics: null,
          profilePicsPublicId: null,
          active: true,
          userRoleId: "7eb374eb-64c5-4ffa-965c-e12786b09994",
          departmentId: null,
          iv: null,
          resetToken: null,
          isInviteActive: false,
          createdAt: "2021-10-08T11:46:32.030Z",
          updatedAt: "2021-10-08T11:46:32.030Z",
        },
      },
    ],
    tags: [
      {
        id: "8a0e19a6-011d-4db6-af31-6e9c296c20fc",
        title: "Computer Science",
      },
      {
        id: "1546bbaf-d4fb-4be5-9b7f-477e2c06ddd4",
        title: "Computer Engineering",
      },
    ],
  },
};

export const userForumGetQuestionDetailsRes_questionId_2 = {
  data: {
    id: "questionId_2",
    title: "File uploaders",
    question: "How to upload files to cloudinary",
    createdAt: "2021-10-20T05:16:51.057Z",
    userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f", // TODO: won't take this
    // TODO: propose to the backend team
    user: {
      id: "userId_2",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "jane",
      lastName: "bar",
    },
    forumComments: [
      {
        id: "3f7ef39b-5f9a-40f0-9477-0db3909f3974",
        comment: "I love this question",
        likes: 0,
        dislikes: 0,
        active: true,
        createdAt: "2021-10-20T05:37:27.110Z",
        updatedAt: "2021-10-20T05:37:27.110Z",
        questionId: "f4b680ee-2330-4cf4-8d62-8c0296c82573",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
        user: {
          id: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
          firstName: "tobby",
          lastName: "Joahian",
          email: "admin@admin.com",
          phone: "08111001001",
          password:
            "$2b$10$vn57DyG8oMnm0ttOZxfcPe19IGuQthE5DGVpHJvjYh4sjiyqW/Vty",
          profilePics: null,
          profilePicsPublicId: null,
          active: true,
          userRoleId: "7eb374eb-64c5-4ffa-965c-e12786b09994",
          departmentId: null,
          iv: null,
          resetToken: null,
          isInviteActive: false,
          createdAt: "2021-10-08T11:46:32.030Z",
          updatedAt: "2021-10-08T11:46:32.030Z",
        },
      },
    ],
    tags: [
      {
        id: "8a0e19a6-011d-4db6-af31-6e9c296c20fc",
        title: "Computer Science",
        // "forumQuestionTags": {
        //   "id": "b56f7d4e-8f11-4ef2-a0bd-31e6af64e3fc",
        //   "createdAt": "2021-10-20T05:16:51.074Z",
        //   "updatedAt": "2021-10-20T05:16:51.074Z",
        //   "questionId": "f4b680ee-2330-4cf4-8d62-8c0296c82573",
        //   "tagId": "8a0e19a6-011d-4db6-af31-6e9c296c20fc"
        // }
      },
      {
        id: "1546bbaf-d4fb-4be5-9b7f-477e2c06ddd4",
        title: "Computer Engineering",
        // "forumQuestionTags": {
        //   "id": "7d49785a-88b4-4048-b6a9-b0510f845a2e",
        //   "createdAt": "2021-10-20T05:16:51.074Z",
        //   "updatedAt": "2021-10-20T05:16:51.074Z",
        //   "questionId": "f4b680ee-2330-4cf4-8d62-8c0296c82573",
        //   "tagId": "1546bbaf-d4fb-4be5-9b7f-477e2c06ddd4"
        // }
      },
    ],
  },
};

export const userForumGetYourQuestionsRes = {
  data: {
    count: 2,
    rows: [
      {
        id: "questionId_1",
        title: "File uploadrgo",
        question: "How to upload files to cloudinary",
        createdAt: "2021-10-19T23:37:54.484Z",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
        tags: [
          { id: "forumTagId_1", name: "javascript" },
          { id: "forumTagId_2", name: "dart" },
        ],
        commentCount: 10,
      },
      {
        id: "questionId_2",
        title: "File uploaders",
        question: "How to upload files to cloudinary",
        createdAt: "2021-10-20T05:16:51.057Z",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
        tags: [
          { id: "forumTagId_1", name: "javascript" },
          { id: "forumTagId_2", name: "dart" },
        ],
        commentCount: 10,
      },
    ],
  },
};

export const userForumGetATagSearchQuestionsResultRes = {
  data: {
    count: 2,
    rows: [
      {
        id: "questionId_1",
        title: "File uploadrgo",
        question: "How to upload files to cloudinary",
        createdAt: "2021-10-19T23:37:54.484Z",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
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
        title: "File uploaders",
        question: "How to upload files to cloudinary",
        createdAt: "2021-10-20T05:16:51.057Z",
        userId: "29f4ece6-a5ba-421f-ac00-6fb9d3a70e0f",
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
  },
};
