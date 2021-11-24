import {
  getDurationBetweenStartTimeAndEndTime,
  getEndTime,
} from "../../../utils";
import { http } from "../http";
/**
 * Endpoint to get `course-listing`
 *
 * @returns {Promise<{ courses: CourseListArray }>}
 */
export const adminGetCourseListing = async () => {
  const path = `/course/admin/list`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    courses: data.map((course) => ({
      id: course.id,
      title: course.title,
      instructor: {
        firstName: course.user.firstName,
        lastName: course.user.lastName,
      },
      startDate: course.lesson[0] ? course.lesson[0].startTime : "not set",
      isPublished: course.isPublished,
    })),
  };
};

/**
 * Endpoint for course editing/modification
 * @param {string} courseId
 * @param {object} body
 * @returns {Promise<{ message: string, course: { id: string }}>}
 */
export const adminEditCourse = async (courseId, body) => {
  const path = `/course/edit/${courseId}`;

  const {
    data: { message, data },
  } = await http.patch(path, body);

  const course = {
    id: data[0].id,
  };

  return { message, course };
};

/**
 * Endpoint for course creation
 * @param {{ title: string, thumbnail: File, certificate: File, description: string, departmentId: string, }} body
 * @returns {Promise<{ message: string, course: { id: string } }>}
 */
export const adminCreateCourse = async (body) => {
  const path = "/course/create";

  const {
    data: { message, data },
  } = await http.post(path, body);

  const course = { id: data.id };

  return { message, course };
};

/**
 * Endpoint to get user `course-listing`
 *
 * @returns {Promise<{ courses: CourseListArray }>}
 */
export const userGetCourseListing = async () => {
  const path = `/course/user/courses`;

  const {
    data: { data },
  } = await http.get(path);

  return { courses: data };
};

/**
 * Endpoint to get user `course-listing`
 *
 * @returns {Promise<{ courses: CourseListArray }>}
 */
export const adminGetUserCourseListing = async (userId) => {
  const path = `/admin/courses/${userId}`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    courses: data.map((course) => ({
      id: course.id,
      title: course.title,
      instructor: {
        name: course.instructor.firstName + " " + course.instructor.lastName,
      },
      status: course.progressPercentage,
      active: course.active,
    })),
  };
};

/**
 * Endpoint to get `course-details` for a user
 * @param {string} id - courseId
 *
 * @returns {Promise<{ course: Course }>}
 */
export const userGetCourseDetails = async (id) => {
  const path = `/course/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    course: {
      // TODO: remove lazy mapping
      ...data, // TODO: remove lazy mapping
      lessons: data.lesson.map((l) => ({
        ...l,
        hasCompleted: l.lessonTracking?.[0]?.isCompleted ? true : false,
        duration: getDurationBetweenStartTimeAndEndTime(l.startTime, l.endTime),
      })), // TODO: remove lazy mapping
      assessments: data.assessment.map((a) => ({
        ...a,
        hasCompleted: a.assessmentScoreSheets?.[0] ? true : false,
        endTime: getEndTime(a.startTime, a.duration),
      })), // TODO: remove lazy mapping
      examination: {
        ...data.examination,
        hasCompleted: data.examination.examinationScoreSheets?.[0]
          ? true
          : false,
        endTime: getEndTime(
          data.examination.startTime,
          data.examination.duration
        ),
      },
      startTime: data.lesson[0].startTime,
      endTime: data?.lesson[data.lesson.length - 1].endTime,
    }, // TODO: remove lazy mapping
  };
};

/**
 * Endpoint to publish course
 * @param {string} id - courseId
 *
 * @returns {Promise<{ course: Course }>}
 */
export const adminPublishCourse = async (id) => {
  const path = `/course/publish/${id}`;

  await http.patch(path);
};

/**
 * Endpoint to delete course
 * @param {string} id - courseId
 *
 * @returns {Promise<{ course: Course }>}
 */
export const adminDeleteCourse = async (id) => {
  const path = `/course/delete/${id}`;

  await http.delete(path);
};
/**
 * Endpoint to delete multiple course
 *
 * @returns {Promise<{ course: Course }>}
 */
export const adminDeleteMultipleCourses = async () => {
  const path = `/course/delete-multiple`;

  await http.delete(path);
};

/**
 * Endpoint to unpublish course
 * @param {string} id - id
 *
 * @returns {Promise<{ course: Course }>}
 */
export const adminUnpublishCourse = async (id) => {
  const path = `/course/unpublish/${id}`;

  await http.patch(path);
};
