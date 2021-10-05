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
      id: "9ae34487-a353-4092-b030-5eb8c6d962c6",
      duration: 120,
      description: "Learn HTML and CSS for free today",
      disabled: true,
      title: "Web dev 2021",
      thumbnail:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
      // departmentId: "departmentId_1",
      lessonCount: 0,
      instructor: {
        id: "instructorId_1",
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "john",
        lastName: "doe",
      },
      progressPercentage: 0,
    },
    {
      id: "f3596e22-a60d-4ca8-be1c-f238445441b6",
      duration: 180,
      description: "Nodejs Advanced Concept",
      disabled: false,
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
      },
      progressPercentage: 75,
    },
  ],
};
