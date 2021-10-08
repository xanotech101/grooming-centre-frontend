export const adminCourseListingRes = {
  data: [
    {
      id: 23,
      title: "The implication of financial crisis in the society",
      instructor: {
        firstName: "Roman",
        lastName: "job",
      },
      startDate: new Date(),
      isPublished: false,
    },
    {
      id: 1,
      title: "The best course on automation testing",
      instructor: {
        firstName: "Richcode",
        lastName: "dart",
      },
      startDate: new Date(),
      isPublished: true,
    },
  ],
};

export const userCourseListingRes = {
  data: [
    {
      id: "courseId_1",
      duration: 120,
      description: "Learn HTML and CSS for free today",
      title: "Web dev 2021",
      thumbnail:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
      lessonCount: 23,
      instructor: {
        id: "instructorId_2",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "jane",
        lastName: "bar",
        title: "Senior Facility Manager",
      },
      progressPercentage: 75,
    },

    {
      id: "courseId_3",
      duration: 100,
      description: "React Design Patters",
      disabled: false,
      title: "Become A React Guru",
      thumbnail:
        "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
      lessonCount: 24,
      instructor: {
        id: "instructorId_3",
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "Richcode",
        lastName: "dart",
        title: "Junior Developer",
      },
      progressPercentage: 13,
    },
    {
      id: "courseId_2",
      duration: 180,
      description: "Nodejs Advanced Concept",
      disabled: true,
      title: "Backend Development",
      thumbnail:
        "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
      lessonCount: 0,
      instructor: {
        id: "instructorId_1",
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "john",
        lastName: "doe",
        title: "Team Lead",
      },
      progressPercentage: 0,
    },
  ],
};

export const userCourseDetailsRes_courseId_1 = {
  data: {
    id: "courseId_1",
    duration: 120,
    description: "Nodejs Advanced Concept",
    title: "Backend Development",
    thumbnail:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
    instructor: {
      id: "instructorId_2",
      profilePics:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      firstName: "jane",
      lastName: "bar",
      title: "Senior Facility Manager",
    },
    lessons: [
      {
        id: "lessonId_1",
        title: "Introduction to HTML",
        startTime: "2021-010-18 04:25 PM",
        endTime: "2021-010-18 05:35 PM",
        lessonTypeId: "6689d710-5488-43a4-9b71-11a3159af6f2",
      },
      {
        id: "lessonId_2",
        title: "Introduction to GO",
        startTime: "2021-010-21 02:25 PM",
        endTime: "2021-010-21 03:35 PM",
        courseId: "f3596e22-a60d-4ca8-be1c-f238445441b6",
        lessonTypeId: "6689d710-5488-43a4-9b71-11a3159af6f2",
      },
      {
        id: "lessonId_3",
        title: "Introduction to CSS",
        disabled: true,
        startTime: "2021-010-18 11:25 AM",
        endTime: "2021-010-18 12:35 PM",
        courseId: "f3596e22-a60d-4ca8-be1c-f238445441b6",
        lessonTypeId: "4adf4cda-d69b-4d95-ad44-d1118529e246",
      },
    ],
    assessments: [
      {
        id: "assessmentId_1",
        topic: "Introduction to HTML",
        duration: 70,
        questionCount: 20,
        minimumPercentageScoreToEarnABadge: 80,
      },
      {
        id: "assessmentId_2",
        topic: "HTML architecture",
        duration: 50,
        questionCount: 13,
        minimumPercentageScoreToEarnABadge: 90,
      },
      {
        disabled: true,
        id: "assessmentId_3",
        topic: "HTML semantics",
        // duration: 50,
        // questionCount: 13,
        // minimumPercentageScoreToEarnABadge: 90,
      },
    ],
  },
};

export const userCourseDetailsRes_courseId_3 = {
  data: {
    id: "courseId_3",
    duration: 100,
    description: "React Design Patters",
    disabled: false,
    title: "Become A React Guru",
    thumbnail:
      "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
    lessonCount: 24,
    instructor: {
      id: "instructorId_3",
      profilePics:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
      firstName: "Richcode",
      lastName: "dart",
      title: "Junior Developer",
    },
    lessons: [
      {
        id: "lessonId_1",
        title: "Introduction to HTML",
        startTime: "2021-010-18 04:25 PM",
        endTime: "2021-010-18 05:35 PM",
        lessonTypeId: "6689d710-5488-43a4-9b71-11a3159af6f2",
      },
      {
        id: "lessonId_2",
        title: "Introduction to GO",
        startTime: "2021-010-21 02:25 PM",
        endTime: "2021-010-21 03:35 PM",
        courseId: "f3596e22-a60d-4ca8-be1c-f238445441b6",
        lessonTypeId: "6689d710-5488-43a4-9b71-11a3159af6f2",
      },
      {
        id: "lessonId_3",
        title: "Introduction to CSS",
        disabled: true,
        startTime: "2021-010-18 11:25 AM",
        endTime: "2021-010-18 12:35 PM",
        courseId: "f3596e22-a60d-4ca8-be1c-f238445441b6",
        lessonTypeId: "4adf4cda-d69b-4d95-ad44-d1118529e246",
      },
    ],
    assessments: [
      {
        id: "assessmentId_1",
        topic: "Introduction to HTML",
        duration: 70,
        questionCount: 20,
        minimumPercentageScoreToEarnABadge: 80,
      },
      {
        id: "assessmentId_2",
        topic: "HTML architecture",
        duration: 50,
        questionCount: 13,
        minimumPercentageScoreToEarnABadge: 90,
      },
    ],
  },
};
