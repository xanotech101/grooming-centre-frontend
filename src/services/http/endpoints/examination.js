import { http } from "../http";

/**
 * Endpoint to get `examination-details`
 * @param {string} id - examinationId
 *
 * @returns {Promise<{ examination: Examination }>}
 */
export const requestExaminationDetails = async (id) => {
  const path = `/examination/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const examination = {
    id: data.id,
    courseId: data.courseId,
    topic: data.title,
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

  return { examination };
};

/**
 * Endpoint to submit an `examination`
 * @param {string} id - examinationId
 * @param {{}} body - answers
 *
 * @returns {Promise<{ message: string }>}
 */
export const submitExamination = async (id, body) => {
  const path = `/examination/${id}/submit`;

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};
