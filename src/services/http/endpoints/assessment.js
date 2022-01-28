import { getEndTime } from "../../../utils";
import { http } from "../http";

/**
 * Endpoint to get `assessment-details`
 * @param {string} id - assessmentId
 *
 * @returns {Promise<{ assessment: Assessment }>}
 */
export const requestAssessmentDetails = async (id, forAdmin) => {
  const path = `/assessment${forAdmin ? "/admin" : ""}/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const assessment = {
    id: data.id,
    courseId: data.courseId,
    topic: data.title,
    duration: data.duration,
    questionCount: data.amountOfQuestions,
    startTime: data.startTime,
    endTime: getEndTime(data.startTime, data.duration),
    hasCompleted: data.assessmentScoreSheets?.[0] ? true : false,
    minimumPercentageScoreToEarnABadge:
      data.minimumPercentageScoreToEarnABadge || 30, // TODO: remove hard coded data
    questions: data.assessmentQuestions
      ? data.assessmentQuestions.map((q, index) => ({
          id: q.id,
          question: q.question,
          image: q.image,
          // image:
          //   "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80", // TODO: remove hard coded data
          questionIndex: index,
          options: q.options.map((opt) => ({
            id: opt.id,
            isAnswer: opt.isAnswer,
            name: opt.name,
            optionIndex: +opt.optionIndex,
          })),
        }))
      : "not set",
  };

  return { assessment };
};

/**
 * Endpoint to submit an `assessment`
 * @param {object} body - answers
 *
 * @returns {Promise<{ message: string }>}
 */
export const submitAssessment = async (body) => {
  const path = `/assessment/scoresheet/create`;

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
 * Endpoint for assessment question creation
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminCreateAssessmentQuestion = async (body) => {
  const path = "/assessment/question/create";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for assessment modification/update
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminEditAssessmentQuestion = async (body) => {
  const path = `/assessment/question/edit`;

  const {
    data: { message },
  } = await http.patch(path, body);

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

/**
 * Endpoint to for admin to edit a assessment
 * @param {{ title: ?string, duration: number, amountOfQuestions: number, startTime: ?Date, courseId: string }} body
 *
 * @returns {Promise<{ message: string, assessment: { id: string } }>}
 */
export const adminEditAssessment = async (assessmentId, body) => {
  const path = `/assessment/edit/${assessmentId}`;

  const {
    data: { message, data },
  } = await http.patch(path, body);

  const assessment = {
    id: data[0].id,
  };

  return { message, assessment };
};
