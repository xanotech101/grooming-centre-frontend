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
