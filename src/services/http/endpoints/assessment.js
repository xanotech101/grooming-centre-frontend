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
 * Endpoint for Admin to get `question-details`
 * @param {string} questionId
 *
 * @returns {Promise<{ question: Question }>}
 */
export const adminGetQuestionDetails = async (questionId) => {
  const path = `/admin/questions/${questionId}`;

  const {
    data: { data },
  } = await http.get(path);

  const question = {
    id: data.id,
    question: data.question,
    // questionIndex: +data.questionIndex, // TODO: propose this field to be implemented by the BACKEND team
    options: data.options.map((opt) => ({
      id: opt.id,
      name: opt.name,
      optionIndex: +opt.optionIndex,
      isAnswer: opt.isAnswer,
    })),
  };

  return { question };
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
 * Endpoint for admin to create a question
 * @param {string} id - assessmentId
 * @param {{}} body - answers
 *
 * @returns {Promise<{ message: string }>}
 */
export const adminCreateAssessment = async (id, body) => {
  const path = `/assessment/${id}/submit`;

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for assessment question creation
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminCreateAssessmentQuestion = async (body) => {
  const path = "/assessment/question/create/new";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for assessment modification/update
 * @param {string} questionId
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminEditQuestion = async (questionId, body) => {
  const path = `/assessment/question/edit/${questionId}`;

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for assessment listing
 * @param {string} courseId
 *
 * @returns {Promise<{ assessments: Array<{ id: string, courseId: string, title: string,  startTime: Date, duration: number }> }>}
 */
export const adminGetAssessmentListing = async (courseId) => {
  const path = `/assessment/course/${courseId}`;

  const {
    data: { data },
  } = await http.get(path);

  const assessments = data.map((assessment) => ({
    id: assessment.id,
    title: assessment.title,
    courseId: assessment.courseId,
    duration: assessment.duration,
    startTime: assessment.startTime,
  }));

  return { assessments };
};
