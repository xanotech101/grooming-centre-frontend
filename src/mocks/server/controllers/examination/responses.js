export const requestExaminationRes_examinationId_1 = {
  data: {
    id: "examinationId_1",
    title: "Html examination",
    duration: 60,
    active: true,
    startTime: "2021-10-20T11:50:00.319Z",
    courseId: "courseId_1",
    examinationQuestions: [
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


export const adminEditExaminationRes_examinationId_1 = {
  message: "Examination updated successfully",
  data: [
    {
      id: "examinationId_1",
    },
  ],
};
export const adminEditExaminationRes_examinationId_2 = {
  message: "Examination updated successfully",
  data: [
    {
      id: "examinationId_2",
    },
  ],
};