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
    questionCount: data.examinationQuestions.length,
    startTime: data.startTime,
    minimumPercentageScoreToEarnABadge: data.minimumPercentageScoreToEarnABadge,
    questions: data.examinationQuestions.map((q, index) => ({
      id: q.id,
      question: q.question,
      questionIndex: +q.questionIndex || index,
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
 * Endpoint for examination creation
 * @param {{ title: string, courseId: string, duration: number, amountOfQuestions: string, startTime: string }} body
 * @returns {Promise<{ message: string, examination: { id: string } }>}
 */
export const adminCreateExamination = async (body) => {
  const path = `/examination/create`;

  const {
    data: { message, data },
  } = await http.post(path, body);

   const examination = {
     id: data.id,
   };

   return { message, examination };
};

/**
 * Endpoint for examination listing
 * @param {string} courseId
 *
 * @returns {Promise<{ examinations: Array<{ id: string, courseId: string, title: string,  startTime: Date, duration: number }> }>}
 */
export const adminGetExaminationListing = async (courseId) => {
  const path = `/examination/course/${courseId}`;

  const {
    data: { data },
  } = await http.get(path);

  const examinations = data.map((examination) => ({
    id: examination.id,
    title: examination.title,
    courseId: examination.courseId,
    duration: examination.duration,
    startTime: examination.startTime,
  }));

  return { examinations };
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

/**
 * Endpoint for examination question creation
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminCreateExaminationQuestion = async (body) => {
  const path = "/examination/question/create/new";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};
