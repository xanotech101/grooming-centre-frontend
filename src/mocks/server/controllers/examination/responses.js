export const requestExaminationRes_examinationId_1 = {
  data: {
    id: "examinationId_1",
    courseId: "courseId_3",
    title: "Html examination",
    startTime: new Date(new Date()),
    endTime: new Date(new Date().getTime() + 1000 * 60 * 5),
    duration: 5,
    questionCount: 3,
    minimumPercentageScoreToEarnABadge: 80,
    questions: [
      {
        id: "questionsId_1",
        question: "How do you create an HTML tag?",
        questionIndex: "2",
        options: [
          {
            id: "optionId_1",
            name: "Me",
            optionIndex: "2",
          },
          {
            id: "optionId_2",
            name: "Myself",
            optionIndex: "0",
          },
          {
            id: "optionId_3",
            name: "and I",
            optionIndex: "1",
          },
        ],
      },
      {
        id: "questionsId_2",
        question: "How do you create style rules?",
        questionIndex: "0",
        options: [
          {
            id: "optionId_1",
            name: "Me",
            optionIndex: "2",
          },
          {
            id: "optionId_2",
            name: "Myself",
            optionIndex: "0",
          },
          {
            id: "optionId_3",
            name: "and I",
            optionIndex: "1",
          },
        ],
      },
      {
        id: "questionsId_3",
        question: "Why do you create a style rule?",
        questionIndex: "1",
        options: [
          {
            id: "optionId_1",
            name: "Me",
            optionIndex: "2",
          },
          {
            id: "optionId_2",
            name: "Myself",
            optionIndex: "0",
          },
          {
            id: "optionId_3",
            name: "and I",
            optionIndex: "1",
          },
        ],
      },
    ],
  },
};

export const submitExaminationRes = {
  message: "submit successful",
};
