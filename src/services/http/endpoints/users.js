import { http } from "../..";

/**
 * Endpoint to get `user-listing`
 *
 * @returns {Promise<{ data: UserListArray }>}
 */
export const adminGetUserListing = async () => {
  const path = `/admin/users`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    users: data.rows.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userRoleId: user.userRole.id,
      userRoleName: user.userRole.name,
      departmentId: user.department.id,
      departmentName: user.department.name,
      certificates: user.certificates,
      gradePoint: user.overallGrade.averageGradeScore,
      noOfCertificate: user.noOfCertificate,
    })),
  };
};

/**
 * Endpoint to get `user-details` for an admin
 * @param {string} id - userId
 *
 * @returns {Promise<{ user: User }>}
 */
export const adminGetUserDetails = async (id) => {
  const path = `/admin/users/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const user = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    userRoleId: data.userRole[0].id,
    userRoleName: data.userRole[0].name,
    departmentId: data.department[0].id,
    departmentName: data.department[0].name,
    certificates: data.certificates ? data.certificates : "notset",
    // gradePoint: data.overallGrade.averageGradeScore
    //   ? data.overallGrade.averageGradeScore
    //   : 0,
    noOfCertificate: data.certificate.length ? data.certificate.length : 0,
    completedCourses: data.courseTrackingProgress.length
      ? data.courseTrackingProgress.length
      : 0,
    completedAssessment: data.assessmentScoreSheets.length
      ? data.lassessmentScoreSheets.length
      : 0,
    phone: data.phone ? data.phone : "notset",
    profilePics: data.profilePics,
    isInviteActive: data.isInviteActive,
  };

  return { user };
};
