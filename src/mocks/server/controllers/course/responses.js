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
      thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
      // departmentId: "departmentId_1",
      lessonCount: 0,
      instructor: {
        id: "instructorId_1",
        profilePics:
          "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
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
      thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
      // departmentId: "departmentId_2",
      lessonCount: 24,
      instructor: {
        id: "instructorId_2",
        profilePics:
          "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
        firstName: "jane",
        lastName: "bar",
      },
      progressPercentage: 75,
    },
  ],
};
