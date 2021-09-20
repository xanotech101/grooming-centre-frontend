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
 * @returns Object { message: `string` }
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
 * @returns Object { user: `Object`, token: `string` }
 */
export const userSignin = async (body) => {
  const url = "/login";

  const {
    data: {
      data: { user },
      token,
    },
  } = await http.post(url, body);

  return { user, token };
};
