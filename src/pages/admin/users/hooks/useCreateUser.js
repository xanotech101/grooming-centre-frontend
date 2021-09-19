import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Create User state manager
 *
 * @returns Object { formManager: `ReactHookForm`, departmentIsRequired: `boolean` }
 */
const useCreateUser = () => {
  const formManager = useForm();
  const [departmentIsRequired, setDepartmentIsRequired] = useState(true);

  useEffect(() => {
    const subscription = formManager.watch((data, { name, type }) => {
      if (name === "role" && data.role === "Role-2") {
        setDepartmentIsRequired(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [formManager.watch]);

  return { formManager, departmentIsRequired };
};

export default useCreateUser;
