import { http } from "../..";

/**
 * Endpoint to get `role-listing`
 *
 * @returns {Promise<{ data: roleListArray }>}
 */
export const adminGetRoleListing = async () => {
  const path = `/admin/roles`;

  const {
    data: { data },
  } = await http.get(path);

   const roles = data.map((role) => ({
     id: role.id,
     name: role.name,
     noOfusers: role.noOfusers,
   }));

   return { roles };
};
