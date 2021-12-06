import { http } from "../http";

/**
 * Endpoint to get `lesson-details`
 * @param {string} id - courseId
 *
 * @returns {Promise<{ certificate: certificate }>}
 */
export const requestCertificateDetails = async (id) => {
  const path = `/courses/${id}/certificate`;

  const {
    data: { data },
  } = await http.get(path);

  return { certificate: data };
};
