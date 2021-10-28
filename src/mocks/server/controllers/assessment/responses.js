export const adminGetQuestionDetailsRes_questionId_1 = {
  data: {
    id: "questionId_1",
    question: `{"blocks":[{"key":"bd4p2","text":"How to Stye A div","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":5,"style":"UNDERLINE"},{"offset":12,"length":5,"style":"BOLD"},{"offset":12,"length":5,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    options: [
      {
        id: "optionId_1",
        name: "me",
        optionIndex: "1",
        isAnswer: true,
      },
      {
        id: "optionId_2",
        name: "you",
        optionIndex: "2",
        isAnswer: false,
      },
      {
        id: "optionId_3",
        name: "them",
        optionIndex: "3",
        isAnswer: false,
      },
      {
        id: "optionId_4",
        name: "we",
        optionIndex: "4",
        isAnswer: false,
      },
    ],
  },
};
export const adminGetQuestionDetailsRes_questionId_2 = {
  data: {
    id: "questionId_2",
    question: `{"blocks":[{"key":"bd4p2","text":"How to Create Me","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    options: [
      {
        id: "optionId_1",
        name: "me",
        optionIndex: "1",
        isAnswer: false,
      },
      {
        id: "optionId_2",
        name: "you",
        optionIndex: "2",
        isAnswer: true,
      },
      {
        id: "optionId_3",
        name: "them",
        optionIndex: "3",
        isAnswer: false,
      },
      {
        id: "optionId_4",
        name: "we",
        optionIndex: "4",
        isAnswer: false,
      },
    ],
  },
};

export const requestAssessmentDetailsRes_assessmentId_1 = {
  data: {
    id: "assessmentId_1",
    title: "Html assessment",
    duration: 60,
    amountOfQuestions: null,
    startTime: "2021-10-18T09:50:00.319Z",
    courseId: "courseId_3",
    assessmentQuestions: [
      {
        id: "questionId_1",
        question: `{"blocks":[{"key":"bd4p2","text":"How to Stye A div","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":5,"style":"UNDERLINE"},{"offset":12,"length":5,"style":"BOLD"},{"offset":12,"length":5,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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

export const requestAssessmentDetailsRes_assessmentId_2 = {
  data: {
    id: "assessmentId_2",
    title: "CSS assessment",
    duration: 60,
    amountOfQuestions: null,
    startTime: "2021-10-18T09:50:00.319Z",
    courseId: "courseId_3",
    assessmentQuestions: [
      {
        id: "questionId_1",
        question: `{"blocks":[{"key":"bd4p2","text":"How to Stye A div","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":5,"style":"UNDERLINE"},{"offset":12,"length":5,"style":"BOLD"},{"offset":12,"length":5,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
      {
        id: "questionId_2",
        question: `{"blocks":[{"key":"bd4p2","text":"How to Create Me","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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

export const submitAssessmentRes = {
  message: "submit successful",
};

export const adminCreateAssessmentQuestionRes = {
  message: "assessment question created successfully",
};
export const adminEditQuestionRes = {
  message: "question updated successfully",
};

export const adminGetExaminationListingRes_courseId_1 = {
  data: [
    {
      id: "assessmentId_1",
      title: "Html assessment",
      courseId: "courseId_1",
      duration: 90,
      startTime: "2021-010-18 04:20 PM",
    },
  ],
};

export const adminGetExaminationListingRes_courseId_3 = {
  data: [
    {
      id: "assessmentId_2",
      title: "CSS assessment",
      courseId: "courseId_3",
      duration: 90,
      startTime: "2021-010-18 04:20 PM",
    },
  ],
};
