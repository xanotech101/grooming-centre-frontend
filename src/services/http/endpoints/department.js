import { http } from "../http";

/**
 * Endpoint for assessment listing
 *
 *
 * @returns {Promise<{ assessments: Array<{ id: string, name: string, createdAt: Date, noOfUsers: number }> }>}
 */
export const adminGetDepartmentListing = async () => {
  const path = `/department/all`;

  const {
    data: { data },
  } = await http.get(path);

  const departments = data.rows.map((department) => ({
    id: department.id,
    name: department.name,
    active: department.active,
    createdAt: department.createdAt,
    updatedAt: department.updatedAt,
    noOfusers: department.noOfusers,
  }));

  return { departments };
};

/**
 * Endpoint for department creation
 * @param {{ name: string, departmentId: string, }} body
 * @returns {Promise<{ message: string, department: { id: string } }>}
 */
export const adminCreateDepartment = async (body) => {
  const path = "/department/create";

  const {
    data: { message, data },
  } = await http.post(path, body);

  const department = { id: data.id };

  return { message, department };
};

/**
 * Endpoint to for admin to create a department
 * @param {{ title: string, departmentId: string}}
 *
 * @returns {Promise<{ message: string, departments: Array<{ id: string, firstName: string, lastName: string, email: string, userRoleId: string,departmentId: string }>}>}
 */
export const adminGetDepartmentUsersListing = async (departmentId) => {
  const path = `/department/users/${departmentId}`;

  const {
    data: { message, data },
  } = await http.get(path);

  const users = data.rows.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userRoleId: user.userRoleId,
    departmentId: user.departmentId,
    userRoleName: user.userRole.name,
  }));

  return { message, users };
};
