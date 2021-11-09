import { http } from "../http";

/**
 * Endpoint to get `examination-details`
 * @param {string} id - courseId
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
    questionCount: data.amountOfQuestions,
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
 * @returns {Promise<{ examinations: Array<{ id: string, examinationId: string, title: string,  startTime: Date, duration: number }> }>}
 */
export const adminGetExaminationListing = async (courseId) => {
  const path = `/examination/${courseId}`;

  const {
    data: { data },
  } = await http.get(path);

  const examinations = [{
    id: data.id,
    title: data.title,
    examinationId: data.examinationId,
    duration: data.duration,
    startTime: data.startTime,
  }]

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
  const path = "/examination/question/create";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint to for admin to edit a examination
 * @param {{ title: ?string, duration: number, amountOfQuestions: number, startTime: ?Date, courseId: string }} body
 *
 * @returns {Promise<{ message: string, examination: { id: string } }>}
 */
export const adminEditExamination = async (examinationId, body) => {
  const path = `/examination/edit/${examinationId}`;

  const {
    data: { message, data },
  } = await http.patch(path, body);

  const examination = {
    id: data[0].id,
  };

  return { message, examination };
};

/**
 * Endpoint for examination modification/update
 * @param {object} body
 * @returns {Promise<{ message: string }>}
 */
export const adminEditExaminationQuestion = async (body) => {
  const path = `/examination/question/edit`;

  const {
    data: { message },
  } = await http.patch(path, body);

  return { message };
};
