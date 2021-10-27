export const requestExaminationRes_examinationId_1 = {
  data: {
    id: "examinationId_1",
    title: "Html examination",
    duration: 60,
    amountOfQuestions: null,
    startTime: "2021-10-18T09:50:00.319Z",
    courseId: "courseId_3",
    assessmentQuestions: [
      {
        id: "questionsId_1",
        question: "How create an HTML?",
        options: [
          {
            id: "optionId_1",
            name: "me",
            optionIndex: "1",
          },
          {
            id: "optionId_2",
            name: "you",
            optionIndex: "2",
          },
          {
            id: "optionId_3",
            name: "them",
            optionIndex: "3",
          },
          {
            id: "optionId_4",
            name: "we",
            optionIndex: "4",
          },
        ],
      },
    ],
  },
};

export const submitExaminationRes = {
  message: "submit successful",
};

export const adminCreateExaminationRes = {
  message: "Examination created successfully",
  data: {
    id: "examinationId_1",
  },
};