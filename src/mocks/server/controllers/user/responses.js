export const user = {
  data: {
    id: "userId_1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    phone: "08012345678",
    userRole: {
      id: "userRoleId_1",
      name: "super admin",
    },
    department: {
      id: "departentId_1",
      name: "Accounting",
    },
  },
};

export const userListingRes = {
  data: {
    rows: [
      {
        ...user.data,
        overallGrade: {
          averageGradeScore: "35",
        },
        noOfCertificate: 1,
      },
      {
        id: "userId_2",
        firstName: "Victoria",
        lastName: "Vivian :)",
        email: "admin@admin.io",
        userRole: {
          id: "userRoleId_2",
          name: "admin",
        },
        department: {
          id: "departentId_2",
          name: "Computer science",
        },
        overallGrade: {
          averageGradeScore: "85",
        },
        noOfCertificate: 2,
      },
      {
        id: "userId_3",
        firstName: "Micheal",
        lastName: "Scofield",
        email: "michealscofield@gmail.com",
        userRole: {
          id: "userRoleId_3",
          name: "user",
        },
        department: {
          id: "departentId_3",
          name: "Software development",
        },
        overallGrade: {
          averageGradeScore: "70",
        },
        noOfCertificate: 5,
      },
    ],
  },
};

export const userDetailsRes_userId_1 = {
  data: {
    ...user.data,
    overallGrade: {
      averageGradeScore: "35",
    },
    noOfCertificate: 1,
    profilePics:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    isInviteActive: false,
    completedCourses: 5,
    completedAssessment: 16,
  },
};

export const userDetailsRes_userId_2 = {
  data: {
    id: "userId_2",
    firstName: "Victoria",
    lastName: "Vivian :)",
    email: "admin@admin.io",
    userRole: {
      id: "userRoleId_2",
      name: "admin",
    },
    department: {
      id: "departentId_2",
      name: "Computer science",
    },
    overallGrade: {
      averageGradeScore: "85",
    },
    noOfCertificate: 2,
    phone: "08012345678",
    profilePics:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    isInviteActive: false,
    completedCourses: 8,
    completedAssessment: 18,
  },
};

export const userDetailsRes_userId_3 = {
  data: {
    id: "userId_3",
    firstName: "Micheal",
    lastName: "Scofield",
    email: "michealscofield@gmail.com",
    userRole: {
      id: "userRoleId_3",
      name: "user",
    },
    department: {
      id: "departentId_3",
      name: "Software development",
    },
    overallGrade: {
      averageGradeScore: "70",
    },
    noOfCertificate: 5,
    phone: "08012345678",
    profilePics:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    isInviteActive: true,
    completedCourses: 10,
    completedAssessment: 22,
  },
};