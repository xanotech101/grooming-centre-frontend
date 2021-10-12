import { http } from "../http";

/**
 * Endpoint to get `courses-overview-details`
 *
 * @returns {Promise<{ coursesOverview: coursesOverview }>}
 */
export const requestCoursesOverviewDetails = async () => {
  const path = `/courses/overview`;
  const {
    data: { data },
  } = await http.get(path);

  const coursesOverview = {
    id: data.id,
    title: data.title,
    completedCourses: data.completedCourses,
    coursesProgress: data.coursesProgress,
    courseCompleted: data.courseCompleted,
    performanceOverview: [
      {
        id: data.performanceOverview.attendance.id,
        title: data.performanceOverview.attendance.title,
        totalProgress: data.performanceOverview.attendance.totalProgress,
        numberOfCourses: data.performanceOverview.attendance.numberOfCourses,
        color: "#46BD84",
      },
      {
        id: data.performanceOverview.assessment.id,
        title: data.performanceOverview.assessment.title,
        totalProgress: data.performanceOverview.assessment.totalProgress,
        numberOfCourses: data.performanceOverview.assessment.numberOfCourses,
        color: "#0083E2",
      },
      {
        id: data.performanceOverview.examination.id,
        title: data.performanceOverview.examination.title,
        totalProgress: data.performanceOverview.examination.totalProgress,
        numberOfCourses: data.performanceOverview.examination.numberOfCourses,
        color: "#800020",
      },
    ],
    coursesInProgress: data.coursesInProgress.map((course) => ({
      id: course.id,
      title: course.title,
      duration: course.duration,
      time: course.time,
      totalProgress: course.totalProgress,
      attendance: course.attendance,
      attendanceValue: course.attendanceValue,
      assessment: course.assessment,
      assessmentValue: course.assessmentValue,
      examination: course.examination,
      examinationValue: course.examinationValue,
    })),
    coursesCompleted: data.coursesCompleted.map((course) => ({
      id: course.id,
      title: course.title,
      duration: course.duration,
      time: course.time,
      totalProgress: course.totalProgress,
      attendance: course.attendance,
      attendanceValue: course.attendanceValue,
      assessment: course.assessment,
      assessmentValue: course.assessmentValue,
      examination: course.examination,
      examinationValue: course.examinationValue,
    })),
  };
  

  return { coursesOverview };
};