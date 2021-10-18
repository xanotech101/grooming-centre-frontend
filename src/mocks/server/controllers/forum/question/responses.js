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
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla",
      tags: [
        { id: "forumTagId_1", name: "javascript" },
        { id: "forumTagId_2", name: "dart" },
      ],
    },
    {
      id: "questionId_2",
      title: "What is a difference between Java nad JavaScript?",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla",
      tags: [
        { id: "forumTagId_1", name: "javascript" },
        { id: "forumTagId_2", name: "dart" },
      ],
    },
  ],
};
