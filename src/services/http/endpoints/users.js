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
    userRoleId: data.userRole.id,
    userRoleName: data.userRole.name,
    departmentId: data.department.id,
    departmentName: data.department.name,
    certificates: data.certificates,
    gradePoint: data.overallGrade.averageGradeScore,
    noOfCertificate: data.certificate.length,
    completedCourses: data.courseTrackingProgress.length,
    completedAssessment: data.assessmentScoreSheets.length,
    phone: data.phone,
    profilePics: data.profilePics,
    isInviteActive: data.isInviteActive,
  };

  return { user };
};
