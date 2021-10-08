import { http } from "../http";

/**
 * Endpoint to get `assessment-details`
 * @param {string} id - assessmentId
 *
 * @returns {Promise<{ assessment: assessment }>}
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
    minimumPercentageScoreToEarnABadge: data.minimumPercentageScoreToEarnABadge,
    questions: data.questions.map((q) => ({
      id: q.id,
      question: q.question,
    })),
  };

  return { assessment };
};
