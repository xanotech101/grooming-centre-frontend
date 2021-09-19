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
 * First step of user creation
 * @param {*} body
 * @returns Object { success: `true`, message: `string` }
 */
export const adminInviteUser = async (body) => {
  const url = "/admin/invite/user";

  const {
    data: { success, message },
  } = await http.post(url, body);

  return { success, message };
};
