import { getEndTime } from "../../../utils";
import { http } from "../http";

// /**
//  * Endpoint to get `examination-details`
//  * @param {string} id - courseId
//  *
//  * @returns {Promise<{ examination: Examination }>}
//  */
// export const requestExaminationDetails = async (id, forAdmin) => {
//   const path = `/examination${forAdmin ? "/admin" : ""}/${id}`;

//   const {
//     data: { data },
//   } = await http.get(path);

//   const examination = {
//     id: data.id,
//     courseId: data.courseId,
//     topic: data.title,
//     duration: data.duration,
//     questionCount: data.amountOfQuestions,
//     startTime: data.startTime,
//     endTime: getEndTime(data.startTime, data.duration),
//     hasCompleted: data.examinationScoreSheets?.[0] ? true : false,
//     minimumPercentageScoreToEarnABadge:
//       data.minimumPercentageScoreToEarnABadge || 30, // TODO: remove hard coded data
//     questions: data.examinationQuestions.map((q, index) => ({
//       id: q.id,
//       question: q.question,
//       questionIndex: +q.questionIndex || index,
//       options: q.options.map((opt) => ({
//         id: opt.id,
//         isAnswer: opt.isAnswer,
//         name: opt.name,
//         optionIndex: +opt.optionIndex,
//       })),
//     })),
//   };

//   return { examination };
// };

// /**
//  * Endpoint for examination creation
//  * @param {{ title: string, courseId: string, duration: number, amountOfQuestions: string, startTime: string }} body
//  * @returns {Promise<{ message: string, examination: { id: string } }>}
//  */
// export const adminCreateExamination = async (body) => {
//   const path = `/examination/create`;

//   const {
//     data: { message, data },
//   } = await http.post(path, body);

//   const examination = {
//     id: data.id,
//   };

//   return { message, examination };
// };

/**
 * Endpoint for examination listing
 * @param {string} courseId
 *
 * @returns {Promise<{ examinations: Array<{ id: string, examinationId: string, title: string,  startTime: Date, duration: number }> }>}
 */
export const adminGetStandaloneExaminationListing = async () => {
  const path = `/stand-alone-examination/all`;

  const {
    data: { data },
  } = await http.get(path);

  const examinations = data.map((exam) => ({
    id: exam.id,
    title: exam.title,
    examinationId: exam.examinationId,
    duration: exam.duration,
    startTime: exam.startTime,
    noOfUsers: exam.examinationCandidateLength,
  }));

  return {
    examinations,
    // showingDocumentsCount: data.rows.length, // No pagination for now
    // totalDocumentsCount: data.count, // No pagination for now
    showingDocumentsCount: data.length,
    totalDocumentsCount: data.length,
  };
};

export const getStandaloneExaminationDetails = async (id, forAdmin) => {
  const path = `/stand-alone-examination${forAdmin ? "/admin" : ""}/${id}`;

  let {
    data: { data },
  } = await http.get(path);

  data = data[0];

  const examination = {
    id: data.id,
    type: data.type,
    selectedIDs: [
      ...(data.departmentIds || [
        // TODO: remove the `||` and this array
        data.type === "users"
          ? "5bae7a67-7cd1-4011-bc56-c39c18a6ad57" // test userId
          : "a2bd09a4-bd5f-4a90-828c-34d57f775af7", // test departmentId
      ]),
    ],
    topic: data.title,
    duration: data.duration,
    questionCount: data.amountOfQuestions,
    startTime: data.startTime,
    endTime: getEndTime(data.startTime, data.duration),
    minimumPercentageScoreToEarnABadge:
      data.minimumPercentageScoreToEarnABadge || 30, // TODO: remove hard coded data
    questions: data.standAloneExaminationQuestion.map((q, index) => ({
      id: q.id,
      question: q.question,
      file: q.file,
      questionIndex: +q.questionIndex || index,
      options: q.options.map((opt, optIndex) => ({
        id: opt.id,
        isAnswer: opt.isAnswer,
        name: opt.answer,
        optionIndex: +opt.optionIndex || optIndex,
      })),
    })),
  };

  return { examination };
};

/**
 * Endpoint for an examination participates
 * @param {string} id
 * @param {object} params
 *
 */
export const adminGetStandaloneExaminationParticipants = async (id, params) => {
  const path = `/stand-alone-examination/participants/${id}`;

  const {
    data: { data },
  } = await http.get(path, { params });

  return {
    users: data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      departmentId: user.department?.id,
      departmentName: user.department?.name,
      grade: user.grade,
    })),
    // showingDocumentsCount: data.rows.length, // TODO: no pagination for now
    // totalDocumentsCount: data.count, // TODO: no pagination for now
    showingDocumentsCount: data.length,
    totalDocumentsCount: data.length,
  };
};

// /**
//  * Endpoint to submit an `examination`
//  * @param {object} body - answers
//  *
//  * @returns {Promise<{ message: string }>}
//  */
// export const submitExamination = async (body) => {
//   const path = `/examination/scoresheet/create`;

//   const {
//     data: { message },
//   } = await http.post(path, body);

//   return { message };
// };

/**
 * Endpoint for examination question creation
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminCreateStandaloneExaminationQuestion = async (body) => {
  const path = "/stand-alone-examination-question/create";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

export const adminDeleteStandaloneExaminationQuestionFile = async (
  questionId
) => {
  const path = `/stand-alone-examination-question/delete/image/${questionId}`;

  await http.delete(path);
};

// /**
//  * Endpoint to for admin to edit a examination
//  * @param {{ title: ?string, duration: number, amountOfQuestions: number, startTime: ?Date, courseId: string }} body
//  *
//  * @returns {Promise<{ message: string, examination: { id: string } }>}
//  */
// export const adminEditExamination = async (examinationId, body) => {
//   const path = `/examination/edit/${examinationId}`;

//   const {
//     data: { message, data },
//   } = await http.patch(path, body);

//   const examination = {
//     id: data[0].id,
//   };

//   return { message, examination };
// };

// /**
//  * Endpoint for examination modification/update
//  * @param {object} body
//  * @returns {Promise<{ message: string }>}
//  */
// export const adminEditExaminationQuestion = async (body) => {
//   const path = `/examination/question/edit`;

//   const {
//     data: { message },
//   } = await http.patch(path, body);

//   return { message };
// };
