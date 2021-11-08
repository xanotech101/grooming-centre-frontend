import { http } from "../..";

//----------- User Endpoints
/**
 * Endpoint to get `user-listing`
 *
 * @returns {Promise<{ data: UserListArray }>}
 */
export const adminGetUserListing = async () => {
  const path = `/admin/users`;

  const {
    data: { data },
  } = await http.get(path);

  return { users: data };
};
//----------- END OF User Endpoints
//

//
//----------- Department Endpoints
/**
 * Endpoint for department creation
 * @param {{name: string, active: boolean}} body
 * @returns {Promise<{ message: string, data: Department }>}
 */
export const adminCreateDepartment = async (body) => {
  const path = "/department/create";

  const {
    data: {
      message,
      data: { department: data },
    },
  } = await http.post(path, body);

  return { message, data };
};
//----------- END OF Department Endpoints
//

//
//----------- User Creation
/**
 * Endpoint for first step to user creation
 * @param {{ email: string, roleId: string, departmentId: string }} body
 * @returns {Promise<{ message: string }>}
 */
export const adminInviteUser = async (body) => {
  const path = "/admin/invite/user";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};

/**
 * Endpoint for first step to admin creation - (super admin)
 * @param {{ email: string, roleId: string, departmentId: string }} body
 * @returns {Promise<{ message: string }>}
 */
export const superAdminInviteAdmin = async (body) => {
  const path = "/superadmin/invite/admin";

  const {
    data: { message },
  } = await http.post(path, body);

  return { message };
};
//------------ END OF User Creation

//========== Uncategorised Endpoints
/**
 * Endpoint to get meta data
 * @returns {Promise<{ data: Object }>}
 */
export const requestMetadata = async () => {
  const path = "/metadata";

  const {
    data: { data },
  } = await http.get(path);

  return { data };
};
//--------- END OF Uncategorised Endpoints
