export const user = {
  data: {
    id: "userId_1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    phone: "08012345678",
    // super admin
    userRoleId: "83e370ef-2be2-40ab-b7c5-7e22fc06eb1b",
    departmentId: "73e2b055-039d-4d38-a1b9-e27351719c98",
  },
};

export const userListingRes = {
  data: [
    {
      ...user.data,
      gradePoint: 60,
      certificates: [],
    },
    {
      id: "userId_2",
      firstName: "Richcode",
      lastName: "Dart",
      email: "richcodedart@gmail.com",
      gradePoint: 70,
      // admin
      userRoleId: "54b0c3c2-08ac-4d6e-a521-2ba7ff9cbfdc",
      departmentId: "1313863e-2efc-407f-b099-5bcfcc35c155",
      certificates: [2, 3],
    },
    {
      id: "userId_3",
      firstName: "Micheal",
      lastName: "Scofield",
      email: "michealscofield@gmail.com",
      gradePoint: 90,
      // user
      userRoleId: "55486296-d163-4d65-ae13-e180191140f5",
      departmentId: "1313863e-2efc-407f-b099-5bcfcc35c155",
      certificates: [],
    },
  ],
};
