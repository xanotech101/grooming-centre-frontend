import { http } from "../http";

/**
 * Endpoint to get `assessment-details`
 * @param {string} id - assessmentId
 *
 * @returns {Promise<{ assessment: Assessment }>}
 */
export const requestAssessmentDetails = async (id) => {
  const path = `/assessment/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const assessment = {
    id: data.id,
    courseId: data.courseId,
    topic: data.title,
    duration: data.duration,
    questionCount: data.amountOfQuestions || data.assessmentQuestions.length,
    startTime: data.startTime,
    minimumPercentageScoreToEarnABadge:
      data.minimumPercentageScoreToEarnABadge || 30, // TODO: remove hard coded data
    questions: data.assessmentQuestions.map((q, index) => ({
      id: q.id,
      question: q.question,
      // questionIndex: +q.questionIndex, // TODO: propose this field to be implemented by the BACKEND team
      questionIndex: index, // TODO: might remove `index`
      options: q.options.map((opt) => ({
        id: opt.id,
        name: opt.name,
        optionIndex: +opt.optionIndex,
      })),
    })),
  };

  return { assessment };
};

/**
 * Endpoint to submit an `assessment`
 * @param {string} id - assessmentId
 * @param {{}} body - answers
 *
 * @returns {Promise<{ message: string }>}
 */
export const submitAssessment = async (id, body) => {
  const path = `/assessment/${id}/submit`;

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};


/**
 * Endpoint for assessment creation
 * @param {{ title: string, courseId: string, duration: number, amountOfQuestions: string, startTime: string }} body
 * @returns {Promise<{ message: string, assessment: { id: string } }>}
 */
export const adminCreateAssessment = async (body) => {
  const path = `/assessment/create`;

  const {
    data: { message, data },
  } = await http.post(path, body);

   const assessment = {
     id: data.id,
   };

   return { message, assessment };
};


/**
 * Endpoint for assessmentQuestions creation
 * @param {{ assessmentId: string, question: string, option: []}} body
 * @returns {Promise<{ message: string, data: assessmentQuestion }>}
 */
export const adminCreateAssessmentQuestion = async (body) => {
  const path = "/assessment/question/create/new";

  const {
    data: { message, data },
  } = await http.post(path, body);

  return { message, data };
};