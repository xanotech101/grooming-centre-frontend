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
      lessonCount: 0,
      instructor: {
        id: "instructorId_1",
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "john",
        lastName: "doe",
        title: "Team Lead",
      },
      progressPercentage: 75,
    },
    {
      id: "courseId_1",
      duration: 180,
      description: "Nodejs Advanced Concept",
      disabled: true,
      title: "Backend Development",
      thumbnail:
        "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
      // departmentId: "departmentId_2",
      lessonCount: 24,
      instructor: {
        id: "instructorId_2",
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "jane",
        lastName: "bar",
        title: "Senior Facility Manager",
      },
      progressPercentage: 0,
    },
  ],
};

export const userCourseDetailsRes = {
  data: {
    id: "courseId_1",
    duration: 120,
    description: "Nodejs Advanced Concept",
    title: "Backend Development",
    thumbnail:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
    instructor: {
      id: "instructorId_1",
      profilePics:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
      firstName: "john",
      lastName: "doe",
      title: "Team Lead",
    },
    lesson: [
      {
        id: "036dd7aa-8a8d-4c1c-b712-98a695827360",
        title: "Introduction to HTML",
        content:
          "This course introduces you to all what you need to know about HTML",
        file: "https://res.cloudinary.com/oluwatobby/video/upload/v1632310108/yt5s.com-React_in_100_Seconds_720p_a0tzha.mp4",
        startTime: "2021-010-18 04:25 PM",
        endTime: "2021-010-18 05:35 PM",
        lessonTypeId: "b4de5c1c-fa91-4572-b05c-a7eaab62a8cd",
      },
      {
        id: "2bb0376e-8181-4c9a-9a80-f339135cf9e7",
        title: "Introduction to GO",
        content:
          "This course introduces you to all what you need to know about Go",
        file: "https://res.cloudinary.com/oluwatobby/video/upload/v1632310108/yt5s.com-React_in_100_Seconds_720p_a0tzha.mp4",
        startTime: "2021-010-21 02:25 PM",
        endTime: "2021-010-21 03:35 PM",
        courseId: "f3596e22-a60d-4ca8-be1c-f238445441b6",
        lessonTypeId: "b4de5c1c-fa91-4572-b05c-a7eaab62a8cd",
      },
      {
        id: "3b85b326-e211-4f41-8f2e-239c90f1bc5f",
        title: "Introduction to CSS",
        disabled: true,
        content:
          "This course introduces you to all what you need to know about CSS",
        file: "https://res.cloudinary.com/oluwatobby/video/upload/v1632310108/yt5s.com-React_in_100_Seconds_720p_a0tzha.mp4",
        startTime: "2021-010-18 11:25 AM",
        endTime: "2021-010-18 12:35 PM",
        courseId: "f3596e22-a60d-4ca8-be1c-f238445441b6",
        lessonTypeId: "b4de5c1c-fa91-4572-b05c-a7eaab62a8cd",
      },
    ],
    assessment: [],
  },
};
