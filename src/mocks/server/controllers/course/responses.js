export const adminCourseListingRes = {
  data: [
    {
      id: "courseId_1",
      title: "The implication of financial crisis in the society",
      description: "Financial Concept",
      user: {
        firstName: "Shalom",
        lastName: "Brain",
      },
      isPublished: false,
      lesson: [
        {
          endTime: "2021-11-25T20:52:00.000Z",
          id: "lessonId_1",
          startTime: "2021-11-25T16:52:59.021Z",
          title: "Introduction to Go",
        },
        {
          endTime: "2021-11-25T20:52:00.000Z",
          id: "lessonId_2",
          startTime: "2021-11-25T18:52:59.021Z",
          title: "Introduction to Html",
        },
      ],
    },
    {
      id: "courseId_3",
      title: "The best course on automation testing",
      description: "Advanced Testing Concept",
      user: {
        firstName: "Richcode",
        lastName: "dart",
      },
      isPublished: true,
      lesson: [],
    },
  ],
};

export const adminCreateCourseRes = {
  message: "course created successfully",
  data: {
    id: "courseId_1",
  },
};

export const adminEditCourseRes_courseId_1 = {
  message: "course updated successfully",
  data: [
    {
      id: "courseId_1",
    },
  ],
};

export const adminEditCourseRes_courseId_3 = {
  message: "course updated successfully",
  data: [
    {
      id: "courseId_3",
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

export const adminGetUserCourseListingRes_userId_1 = {
  data: [
    {
      id: "courseId_1",
      duration: 120,
      description: "Learn HTML and CSS for free today",
      title: "Web dev 2021",
      thumbnail:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
      lessonCount: 23,
      instructorId: "InstructorId_1",
      instructor: {
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "Victoria",
        lastName: "Vivian :)",
        title: "Senior Facility Manager",
      },
      progressPercentage: 75,
    },
    {
      id: "courseId_2",
      duration: 100,
      description: "React Design Patters",
      disabled: false,
      title: "Become A React Guru",
      thumbnail:
        "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
      lessonCount: 24,
      instructorId: "InstructorId_1",
      instructor: {
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "Victoria",
        lastName: "Vivian :)",
        title: "Junior Developer",
      },
      progressPercentage: 13,
    },
  ],
};

export const adminGetUserCourseListingRes_userId_2 = {
  data: [
    {
      id: "courseId_1",
      duration: 120,
      description: "Learn HTML and CSS for free today",
      title: "Web dev 2021",
      thumbnail:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
      lessonCount: 23,
      instructorId: "InstructorId_1",
      instructor: {
        profilePics:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        firstName: "Shalom",
        lastName: "Brain",
        title: "Senior Facility Manager",
      },
      progressPercentage: 100,
    },
    {
      id: "courseId_2",
      duration: 100,
      description: "React Design Patters",
      disabled: false,
      title: "Become A React Guru",
      thumbnail:
        "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
      lessonCount: 24,
      instructorId: "InstructorId_2",
      instructor: {
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "Victoria",
        lastName: "Vivian :)",
        title: "Junior Developer",
      },
      progressPercentage: 13,
    },
  ],
};

export const adminGetUserCourseListingRes_userId_3 = {
  data: [
    {
      id: "courseId_3",
      duration: 100,
      description: "React Design Patters",
      disabled: false,
      title: "Become A React Guru",
      thumbnail:
        "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
      lessonCount: 0,
      instructorId: "InstructorId_1",
      instructor: {
        profilePics:
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
        firstName: "Victoria",
        lastName: "Vivian :)",
        title: "Team Lead",
      },
      progressPercentage: 100,
    },
  ],
};

export const userCourseDetailsRes_courseId_1 = {
  data: {
    id: "courseId_1",
    description: "This course will teach you about javascript",
    disabled: false,
    title: "PHP course for mid-level engineers",
    departmentId: "92ab95a4-47b3-4812-a23e-20951bd4b839",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint.",
    thumbnail:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
    certificate:
      "https://images.unsplash.com/photo-1570610159825-ec5d3823660c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
    lesson: [
      {
        id: "lessonId_1",
        title: "JavaScripts",
        startTime: "2021-09-23T11:03:03.833Z",
        endTime: "2021-09-25T11:03:03.833Z",
        lessonType: {
          id: "4adf4cda-d69b-4d95-ad44-d1118529e246",
          name: "pdf",
        },
      },
    ],
    courseTracking: null,
    assessment: [
      {
        id: "assessmentId_1",
        title: "Html assessment",
        duration: 60,
        amountOfQuestions: null,
      },
    ],
    instructor: { profilePics: null, firstName: "shalom", lastName: "brain" },
    duration: 2880,
  },
};

export const userCourseDetailsRes_courseId_3 = {
  data: {
    id: "courseId_3",
    description: "This course  me",
    disabled: false,
    title: "mock titles",
    departmentId: "92ab95a4-47b3-4812-a23e-20951bd4b839",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint.",
    thumbnail:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
    certificate:
      "https://images.unsplash.com/photo-1570610159825-ec5d3823660c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
    lesson: [
      {
        id: "lessonId_1",
        title: "JavaScripts",
        startTime: "2021-09-23T11:03:03.833Z",
        endTime: "2021-09-25T11:03:03.833Z",
        lessonType: {
          id: "4adf4cda-d69b-4d95-ad44-d1118529e246",
          name: "pdf",
        },
      },
    ],
    courseTracking: null,
    assessment: [
      {
        id: "assessmentId_1",
        title: "Html assessment",
        duration: 60,
        amountOfQuestions: null,
      },
      {
        id: "assessmentId_2",
        title: "CSS assessment",
        duration: 60,
        amountOfQuestions: null,
      },
    ],
    instructor: { profilePics: null, firstName: "shalom", lastName: "brain" },
    duration: 2880,
    examination: {
      id: "examinationId_1",
      duration: 70,
      questionCount: 20,
      minimumPercentageScoreToEarnABadge: 80,
    },
  },
};
