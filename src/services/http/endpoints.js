import { http } from "..";

// export const currentUser = async () => {
//   const {
//     data: {
//       data: { user: data },
//     },
//   } = await http.get("/users/me");

//   return data;
// };

// export const logout = async () => {
//   await http.post("/users/auth/logout");
// };

// export const login = async (body) => {
//   await http.post("/users/auth/login", body);
// };

// export const signup = async (body) => {
//   await http.post("/users/auth/signup", body);
// };

/**
 * Endpoint for first step to user creation
 * @param {} body
 * @returns Promise<{ message: `string` }>
 */
export const adminInviteUser = async (body) => {
  const url = "/admin/invite/user";

  const {
    data: { message },
  } = await http.post(url, body);

  return { message };
};

/**
 * Endpoint for user signin
 * @param {*} body - {email: `string`, password: `string`}
 * @returns Promise<{ user: `Object`, token: `string`, message: `string` }>
 */
export const userSignin = async (body) => {
  const url = "/login";

  const {
    data: {
      data: { user, token },
      message,
    },
  } = await http.post(url, body);

  return { user, token, message };
};

/**
 * Endpoint to get meta data
 * @returns Promise<{ data: `Object` }>
 */
export const getMetadata = async () => {
  const url = "/metadata";

  const {
    data: { data },
  } = await http.get(url);

  return { data };
};

/**
 * Endpoint to get the current user
 * @returns Promise<{ data: `Object` }>
 */
export const getCurrentUser = async () => {
  // const url = "/me";

  // const {
  //   data: { data },
  // } = await http.get(url);

  const data = {
    active: true,
    createdAt: "2021-09-20T13:02:59.161Z",
    departmentId: null,
    email: "admin@admin.com",
    firstName: "tobby",
    id: "71ff458d-eb59-4593-8788-eafb004c5ada",
    isInviteActive: false,
    iv: null,
    lastName: "Joahian",
    phone: "08111001001",
    resetToken: null,
    updatedAt: "2021-09-20T13:02:59.161Z",
    userRoleId: "5b1bd6bf-6547-4e55-af36-453d02eed8e9",
  };

  return { data };
};
