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
    topic: data.topic,
    duration: data.duration,
    questionCount: data.questionCount,
    startTime: data.startTime,
    minimumPercentageScoreToEarnABadge: data.minimumPercentageScoreToEarnABadge,
    questions: data.questions.map((q) => ({
      id: q.id,
      question: q.question,
      questionIndex: +q.questionIndex,
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
