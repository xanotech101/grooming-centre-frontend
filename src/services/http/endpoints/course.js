import { http } from "../http";
/**
 * Endpoint to get `course-listing`
 *
 * @returns {Promise<{ courses: CourseListArray }>}
 */
export const adminGetCourseListing = async () => {
  const path = `/admin/courses`;

  const {
    data: { data },
  } = await http.get(path);



  return {
    courses: data
  };
};

